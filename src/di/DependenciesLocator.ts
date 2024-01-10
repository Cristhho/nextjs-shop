import { CountryDataSource } from '../data/dataSource/CountryDataSource';
import { PrismaCategoryDataSource, PrismaCountryDataSource, PrismaProductDataSource, PrismaUserDataSource, ProductInMemory } from '../data/dataSource';
import { CartDataSource } from '../data/dataSource/CartDataSource';
import { ProductDataSource } from '../data/dataSource/ProductDataSource';
import { UserDataSource } from '../data/dataSource/UserDataSource';
import { ZustandCartDataSource } from '../data/dataSource/zustand/ZustandCartDataSource';
import { ProductRepositoryImpl, UserRepositoryImpl, CountryRepositoryImpl } from '../data/repository';
import { CartRepositoryImpl } from '../data/repository/CartRepositoryImpl';
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
  GetUserByEmail,
  SaveUserUseCase,
  CreateCountryUseCase,
  GetAllCountriesUseCase,
  SaveAddressUseCase
} from '../domain/useCase';

const prismaCategoryDataSource = new PrismaCategoryDataSource()
const productInMemoryDataSource = new ProductInMemory()
const prismaProductDataSource = new PrismaProductDataSource(prismaCategoryDataSource)
const zustandCartDataSource = new ZustandCartDataSource()
const prismaUserDataSource = new PrismaUserDataSource()
const prismaCountryDataSource = new PrismaCountryDataSource()

const productsRepository = (source: ProductDataSource) => new ProductRepositoryImpl(source)
const cartRepository = (source: CartDataSource) => new CartRepositoryImpl(source)
const userRepository = (source: UserDataSource) => new UserRepositoryImpl(source)
const countryRepository = (source: CountryDataSource) => new CountryRepositoryImpl(source)

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
  GetCartSummaryUseCase: new GetCartSummaryUseCase(cartRepository(zustandCartDataSource)),
  SaveAddressUseCase: new SaveAddressUseCase(cartRepository(zustandCartDataSource)),
}

const userUseCases = {
  CreateUserUseCase: new CreateUserUseCase(userRepository(prismaUserDataSource)),
  GetUserByEmail: new GetUserByEmail(userRepository(prismaUserDataSource)),
  SaveUserUseCase: new SaveUserUseCase(userRepository(prismaUserDataSource)),
}

const countryUseCases = {
  CreateCountryUseCase: new CreateCountryUseCase(countryRepository(prismaCountryDataSource)),
  GetAllCountriesUseCase: new GetAllCountriesUseCase(countryRepository(prismaCountryDataSource))
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
  SaveAddressUseCase: cartUseCases.SaveAddressUseCase,

  CreateUserUseCase: userUseCases.CreateUserUseCase,
  GetUserByEmail: userUseCases.GetUserByEmail,
  SaveUserUseCase: userUseCases.SaveUserUseCase,

  CreateCountryUseCase: countryUseCases.CreateCountryUseCase,
  GetAllCountriesUseCase: countryUseCases.GetAllCountriesUseCase
}
