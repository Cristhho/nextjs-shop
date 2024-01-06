import { PrismaCategoryDataSource, PrismaProductDataSource, PrismaUserDataSource, ProductInMemory } from '../data/dataSource';
import { CartDataSource } from '../data/dataSource/CartDataSource';
import { ProductDataSource } from '../data/dataSource/ProductDataSource';
import { UserDataSource } from '../data/dataSource/UserDataSource';
import { ZustandCartDataSource } from '../data/dataSource/zustand/ZustandCartDataSource';
import { ProductRepositoryImpl } from '../data/repository';
import { CartRepositoryImpl } from '../data/repository/CartRepositoryImpl';
import { UserRepositoryImpl } from '../data/repository/UserRepositoryImpl';
import { ProductRepository } from '../domain/repository/ProductRepository';
import {
  CreateProductUseCase,
  GetProductsUseCase,
  GetPaginatedProductsUseCase,
  GetProductBySlugUseCase,
  GetProductStockUseCase,
  AddProductToCartUseCase,
  UpdateProductQuantityUseCase,
  RemoveProductFromCartUseCase,
  GetCartSummaryUseCase,
  CreateUserUseCase,
  GetUserByEmail
} from '../domain/useCase';

const prismaCategoryDataSource = new PrismaCategoryDataSource()
const productInMemoryDataSource = new ProductInMemory()
const prismaProductDataSource = new PrismaProductDataSource(prismaCategoryDataSource)
const zustandCartDataSource = new ZustandCartDataSource()
const prismaUserDataSource = new PrismaUserDataSource()

const productsRepository = (source: ProductDataSource) => new ProductRepositoryImpl(source)
const cartRepository = (source: CartDataSource) => new CartRepositoryImpl(source)
const userRepository = (source: UserDataSource) => new UserRepositoryImpl(source)

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

const userUseCases = {
  CreateUserUseCase: new CreateUserUseCase(userRepository(prismaUserDataSource)),
  GetUserByEmail: new GetUserByEmail(userRepository(prismaUserDataSource))
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
  GetCartSummaryUseCase: cartUseCases.GetCartSummaryUseCase,

  CreateUserUseCase: userUseCases.CreateUserUseCase,
  GetUserByEmail: userUseCases.GetUserByEmail
}
