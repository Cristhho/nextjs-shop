import { Category, Product as PrismaProduct, ProductImage } from '@prisma/client';
import { Product, Type } from '@/domain/model';
import prisma from '../../../lib/prisma';
import { ProductDataSource } from '../ProductDataSource';
import { PrismaCategoryDataSource } from './PrismaCategoryDataSource';

type ProductImageUrl = Pick<ProductImage, 'url'>
type DBProduct = PrismaProduct & {
  ProductImage: ProductImageUrl[],
  category: Pick<Category, 'name'>
}

export class PrismaProductDataSource implements ProductDataSource {

  constructor(private readonly prismaCategorySource: PrismaCategoryDataSource) {}

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
        const categoryDB = await this.prismaCategorySource.getByName(type.toLowerCase());
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

  private mapToDomain(product: DBProduct): Product {
    return {
      ...product,
      type: product.category.name as Type,
      images: product.ProductImage.map(image => image.url)
    }
  }

}