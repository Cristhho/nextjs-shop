import { Category, Product as PrismaProduct, ProductImage } from '@prisma/client';
import { PaginationResponse, Product, Type } from '@/domain/model';
import prisma from '../../../lib/prisma';
import { ProductDataSource } from '../ProductDataSource';
import { PrismaCategoryDataSource } from './PrismaCategoryDataSource';
import { ProductsPaginationOptions } from './interfaces/PaginationOptions';

type ProductImageUrl = Pick<ProductImage, 'url'>
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
            url: true
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
        const {images, type, ...$product} = product;
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
              url: true
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

  private mapToDomain(product: DBProduct): Product {
    return {
      ...product,
      type: product.category?.name as Type,
      images: product.ProductImage.map(image => image.url)
    }
  }

}