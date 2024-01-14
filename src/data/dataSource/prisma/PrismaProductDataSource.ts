import { Category, Gender, Product as PrismaProduct, ProductImage, Size } from '@prisma/client';
import { CreateProduct, OrderProduct, PaginationResponse, Product, Type } from '@/domain/model';
import prisma from '../../../lib/prisma';
import { ProductDataSource } from '../ProductDataSource';
import { PrismaCategoryDataSource } from './PrismaCategoryDataSource';
import { ProductsPaginationOptions } from './interfaces/PaginationOptions';

type ProductImageUrl = Pick<ProductImage, 'url'|'id'>
type DBProduct = PrismaProduct & {
  ProductImage: ProductImageUrl[],
  category?: Pick<Category, 'name'>
}

export class PrismaProductDataSource implements ProductDataSource {

  constructor(private readonly prismaCategorySource?: PrismaCategoryDataSource) {}

  async getAllProducts(): Promise<Product[]> {
    const productsDB = await prisma.product.findMany({
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
            id: true
          }
        },
        category: {
          select: {
            name: true
          }
        }
      }
    })
    return productsDB.map((item) => this.mapToDomain(item))
  }

  createManyProducts(products: Product[]): Promise<boolean> {
    return new Promise((res, rej) => {
      products.forEach(async (product) => {
        const {images, type, ProductImage, ...$product} = product;
        const categoryDB = await this.prismaCategorySource!.getByName(type!.toLowerCase());
        const dbProduct = await prisma.product.create({
          data: {
            ...$product,
            categoryId: categoryDB!.id
          }
        });
        const $images = images.map((image) => ({
          url: image,
          productId: dbProduct.id
        }));
    
        await prisma.productImage.createMany({
          data: $images
        })
      })
      res(true)
    });
  }

  async getWithPagination({ page, take, gender }: ProductsPaginationOptions): Promise<PaginationResponse<Product>> {
    try {
      const products = await prisma.product.findMany({
        take,
        skip: (page! - 1) * take!,
        include: {
          ProductImage: {
            take: 2,
            select: {
              url: true,
              id: true
            }
          }
        },
        where: {
          gender
        }
      })

      const totalCount = await prisma.product.count({
        where: {
          gender,
        },
      })

      const totalPages = Math.ceil(totalCount / take!);
      return {
        currentPage: page || 1,
        totalPages: totalPages,
        items: products.map((product) => this.mapToDomain(product))
      }
    } catch (error) {
      throw new Error("Couldn\'t load products");
    }
  }

  async getBySlug(slug: string) {
    'use server'
    try {
      const product = await prisma.product.findUnique({
        include: {
          ProductImage: {
            take: 2,
            select: {
              url: true,
              id: true
            }
          }
        },
        where: {
          slug
        }
      })
      if (!product) return null;

      return this.mapToDomain(product)
    } catch (error) {
      throw new Error("Couldn\'t load products");
    }
  }

  async getStock(slug: string): Promise<number> {
    try {
      const stock = await prisma.product.findUnique({
        where: {
          slug
        },
        select: {
          inStock: true
        }
      })

      return stock?.inStock ?? 0
    } catch (error) {
      console.error(error)
      return 0
    }
  }

  async findOrderProducts(products: OrderProduct[]) {
    const productsDB = await prisma.product.findMany({
      where: {
        id: {
          in: products.map((p) => p.id),
        },
      },
    })

    return productsDB
  }

  async save(product: CreateProduct): Promise<string> {
    const { id, ...rest } = product
    const createdProduct = await prisma.$transaction(async (tx) => {
      let product: PrismaProduct
      const tagsArray = rest.tags.split(',').map((tag) => tag.trim().toLowerCase())

      if (id) {
        product = await tx.product.update({
          where: { id },
          data: {
            ...rest,
            gender: rest.gender as Gender,
            sizes: {
              set: rest.sizes as Size[]
            },
            tags: {
              set: tagsArray
            }
          }
        })
      } else {
        product = await tx.product.create({
          data: {
            ...rest,
            gender: rest.gender as Gender,
            sizes: {
              set: rest.sizes as Size[]
            },
            tags: {
              set: tagsArray
            }
          }
        })
      }

      return product.slug
    })

    return createdProduct
  }

  private mapToDomain(product: DBProduct): Product {
    return {
      ...product,
      type: product.category?.name as Type,
      images: product.ProductImage.map(image => image.url)
    }
  }

}