import { Order, Prisma, Product } from '@prisma/client';

import { OrderProduct, Address } from '@/domain/model';
import { OrderDataSource } from '../OrderDataSource';
import prisma from '@/lib/prisma';
import { PrismaProductDataSource } from './PrismaProductDataSource';

export class PrismaOrderDataSource implements OrderDataSource {

  constructor(private readonly prismaProduct: PrismaProductDataSource) {}

  async save(orderProducts: OrderProduct[], address: Address, userId: string): Promise<string> {
    const products = await this.prismaProduct.findOrderProducts(orderProducts)
    const itemsInOrder = orderProducts.reduce((count, p) => count + p.quantity, 0)
    const { subTotal, tax, total } = this.getTotals(orderProducts, products)

    const order = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updatedProducts = await Promise.all(this.updateProductsStock(tx.product, products, orderProducts))
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`);
        }
      })

      // 2. Crear la orden - Encabezado - Detalles
      const order = await this.createOrderAndItems(tx.order, {
        userId,
        itemsInOrder,
        subTotal,
        tax,
        total,
        orderProducts,
        products
      })

      // 3. Crear la direccion de la orden
      await this.createOrderAddess(tx.orderAddress, address, order.id)

      return order.id
    })
    return order
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
    )
  }

  private updateProductsStock(productTransaction: Prisma.ProductDelegate, products: Product[], orderProducts: OrderProduct[]) {
    const updatedProductsPromises = products.map((product) => {
      const productQuantity = orderProducts
        .filter((p) => p.id === product.id)
        .reduce((acc, item) => item.quantity + acc, 0)

      if (productQuantity === 0) {
        throw new Error(`${product.id} no tiene cantidad definida`)
      }

      return productTransaction.update({
        where: { id: product.id },
        data: {
          inStock: {
            decrement: productQuantity,
          },
        },
      })
    })

    return updatedProductsPromises
  }

  private async createOrderAndItems(orderTransaction: Prisma.OrderDelegate, data: {
    userId: string,
    itemsInOrder: number,
    subTotal: number,
    tax: number,
    total: number,
    orderProducts: OrderProduct[],
    products: Product[]
  }): Promise<Order> {
    const { userId, itemsInOrder, subTotal, tax, total, orderProducts, products } = data
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
    })
  }

  private async createOrderAddess(addressTransaction: Prisma.OrderAddressDelegate, address: Address, order: string) {
    const { country, ...restAddress } = address
    return await addressTransaction.create({
      data: {
        ...restAddress,
        countryId: country,
        orderId: order,
      }
    })
  }
  
}