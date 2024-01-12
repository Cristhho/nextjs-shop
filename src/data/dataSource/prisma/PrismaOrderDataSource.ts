import { Order, OrderAddress, Prisma, Product } from '@prisma/client';

import { OrderProduct, Address, OrderDetail, OrderHeader, OrderItem, Order as DomainOrder } from '@/domain/model';
import { OrderDataSource } from '../OrderDataSource';
import prisma from '@/lib/prisma';
import { PrismaProductDataSource } from "./PrismaProductDataSource";
import { PrismaOrder, SingleOrder } from './interfaces/Order';

export class PrismaOrderDataSource implements OrderDataSource {
  constructor(private readonly prismaProduct: PrismaProductDataSource) {}

  async save(
    orderProducts: OrderProduct[],
    address: Address,
    userId: string
  ): Promise<string> {
    const products = await this.prismaProduct.findOrderProducts(orderProducts);
    const itemsInOrder = orderProducts.reduce(
      (count, p) => count + p.quantity,
      0
    );
    const { subTotal, tax, total } = this.getTotals(orderProducts, products);

    const order = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updatedProducts = await Promise.all(
        this.updateProductsStock(tx.product, products, orderProducts)
      );
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`);
        }
      });

      // 2. Crear la orden - Encabezado - Detalles
      const order = await this.createOrderAndItems(tx.order, {
        userId,
        itemsInOrder,
        subTotal,
        tax,
        total,
        orderProducts,
        products,
      });

      // 3. Crear la direccion de la orden
      await this.createOrderAddess(tx.orderAddress, address, order.id);

      return order.id;
    });
    return order;
  }

  async getById(orderId: string, userId: string): Promise<OrderDetail|null> {
    const order: PrismaOrder|null = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  take: 1,
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) return null
    if (order.userId !== userId) return null

    return this.mapToDomain(order);
  }
  
  async getByUser(userId: string): Promise<DomainOrder[]> {
    const orders = await prisma.order.findMany({
      where: {
        userId
      },
      select: {
        id: true,
        isPaid: true,
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    })

    return orders.map((order) => this.mapToDomainOrder(order))
  }

  async setTransaction(orderId: string, transaction: string): Promise<boolean> {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId: transaction }
    })

    if (!order) return false

    return true
  }

  private getTotals(orderProducts: OrderProduct[], products: Product[]) {
    return orderProducts.reduce(
      (totals, item) => {
        const productQuantity = item.quantity;
        const product = products.find((product) => product.id === item.id);

        if (!product) throw new Error(`${item.id} no existe`);

        const subTotal = product.price * productQuantity;

        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;

        return totals;
      },
      { subTotal: 0, tax: 0, total: 0 }
    );
  }

  private updateProductsStock(
    productTransaction: Prisma.ProductDelegate,
    products: Product[],
    orderProducts: OrderProduct[]
  ) {
    const updatedProductsPromises = products.map((product) => {
      const productQuantity = orderProducts
        .filter((p) => p.id === product.id)
        .reduce((acc, item) => item.quantity + acc, 0);

      if (productQuantity === 0) {
        throw new Error(`${product.id} no tiene cantidad definida`);
      }

      return productTransaction.update({
        where: { id: product.id },
        data: {
          inStock: {
            decrement: productQuantity,
          },
        },
      });
    });

    return updatedProductsPromises;
  }

  private async createOrderAndItems(
    orderTransaction: Prisma.OrderDelegate,
    data: {
      userId: string;
      itemsInOrder: number;
      subTotal: number;
      tax: number;
      total: number;
      orderProducts: OrderProduct[];
      products: Product[];
    }
  ): Promise<Order> {
    const {
      userId,
      itemsInOrder,
      subTotal,
      tax,
      total,
      orderProducts,
      products,
    } = data;
    return await orderTransaction.create({
      data: {
        userId: userId,
        itemsInOrder: itemsInOrder,
        subTotal: subTotal,
        tax: tax,
        total: total,

        OrderItem: {
          createMany: {
            data: orderProducts.map((p) => ({
              quantity: p.quantity,
              size: p.size,
              productId: p.id,
              price:
                products.find((product) => product.id === p.id)?.price ?? 0,
            })),
          },
        },
      },
    });
  }

  private async createOrderAddess(
    addressTransaction: Prisma.OrderAddressDelegate,
    address: Address,
    order: string
  ) {
    const { country, ...restAddress } = address;
    return await addressTransaction.create({
      data: {
        ...restAddress,
        countryId: country,
        orderId: order,
      },
    });
  }

  private mapToDomain(order: PrismaOrder): OrderDetail {
    const { OrderAddress, OrderItem, ...rest } = order
    const header: OrderHeader = {
      isPaid: rest.isPaid,
      itemsInOrder: rest.itemsInOrder,
      subTotal: rest.subTotal,
      tax: rest.tax,
      total: rest.total
    }
    const { orderId, id, countryId, ...address } = OrderAddress as OrderAddress

    const items: OrderItem[] = OrderItem.map((item) => ({
      quantity: item.quantity,
      price: item.price,
      size: item.size,
      title: item.product.title,
      slug: item.product.slug,
      image: item.product.ProductImage[0].url
    }))

    return {
      header,
      address: {
        ...address,
        country: countryId,
        address2: address.address2 ?? ''
      },
      items
    }
  }

  private mapToDomainOrder(order: SingleOrder): DomainOrder {
    return {
      id: order.id,
      isPaid: order.isPaid,
      firstName: order.OrderAddress?.firstName ?? '',
      lastName: order.OrderAddress?.lastName ?? '',
    }
  }
}
