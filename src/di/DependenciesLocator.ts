import { PrismaCategoryDataSource, PrismaProductDataSource, ProductInMemory } from '@/data/dataSource';
import { CartDataSource } from '@/data/dataSource/CartDataSource';
import { ProductDataSource } from '@/data/dataSource/ProductDataSource';
import { ZustandCartDataSource } from '@/data/dataSource/zustand/ZustandCartDataSource';
import { ProductRepositoryImpl } from '@/data/repository';
import { CartRepositoryImpl } from '@/data/repository/CartRepositoryImpl';
import { ProductRepository } from '@/domain/repository/ProductRepository';
import {
  CreateProductUseCase,
  GetProductsUseCase,
  GetPaginatedProductsUseCase,
  GetProductBySlugUseCase,
  GetProductStockUseCase,
  AddProductToCartUseCase,
  UpdateProductQuantityUseCase,
  RemoveProductFromCartUseCase,
  GetCartSummaryUseCase
} from '@/domain/useCase';

const prismaCategoryDataSource = new PrismaCategoryDataSource()
const productInMemoryDataSource = new ProductInMemory()
const prismaProductDataSource = new PrismaProductDataSource(prismaCategoryDataSource)
const zustandCartDataSource = new ZustandCartDataSource()

const productsRepository = (source: ProductDataSource) => new ProductRepositoryImpl(source)
const cartRepository = (source: CartDataSource) => new CartRepositoryImpl(source)

const productUseCases = (productRepository: ProductRepository) => {
  return {
    GetProductsUseCase: new GetProductsUseCase(productRepository),
    CreateProductUseCase: new CreateProductUseCase(productRepository),
    GetPaginatedProductsUseCase: new GetPaginatedProductsUseCase(productRepository),
    GetProductBySlugUseCase: new GetProductBySlugUseCase(productRepository),
    GetProductStockUseCase: new GetProductStockUseCase(productRepository)
  }
}

const prismaSource = productUseCases(productsRepository(prismaProductDataSource))
const memorySource = productUseCases(productsRepository(productInMemoryDataSource))

const cartUseCases = {
  AddProductToCartUseCase: new AddProductToCartUseCase(cartRepository(zustandCartDataSource)),
  UpdateProductQuantityUseCase: new UpdateProductQuantityUseCase(cartRepository(zustandCartDataSource)),
  RemoveProductFromCartUseCase: new RemoveProductFromCartUseCase(cartRepository(zustandCartDataSource)),
  GetCartSummaryUseCase: new GetCartSummaryUseCase(cartRepository(zustandCartDataSource))
}

export const di = {
  GetProductsInMemory: memorySource.GetProductsUseCase,
  GetProductsUseCase: prismaSource.GetProductsUseCase,
  CreateProductUseCase: prismaSource.CreateProductUseCase,
  GetPaginatedProductsUseCase: prismaSource.GetPaginatedProductsUseCase,
  GetProductBySlugUseCase: prismaSource.GetProductBySlugUseCase,
  GetProductStockUseCase: prismaSource.GetProductStockUseCase,

  AddProductToCartUseCase: cartUseCases.AddProductToCartUseCase,
  UpdateProductQuantityUseCase: cartUseCases.UpdateProductQuantityUseCase,
  RemoveProductFromCartUseCase: cartUseCases.RemoveProductFromCartUseCase,
  GetCartSummaryUseCase: cartUseCases.GetCartSummaryUseCase
}
