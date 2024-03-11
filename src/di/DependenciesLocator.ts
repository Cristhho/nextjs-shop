import 'reflect-metadata';

import { CountryDataSource } from '../data/dataSource/CountryDataSource';
import {
  PrismaAddressDataSource,
  PrismaCategoryDataSource,
  PrismaCountryDataSource,
  PrismaOrderDataSource,
  PrismaUserDataSource,
} from '../data/dataSource';
import { CartDataSource } from '../data/dataSource/CartDataSource';
import { UserDataSource } from '../data/dataSource/UserDataSource';
import { AddressDataSource } from '../data/dataSource/AddressDataSource';
import { OrderDataSource } from '../data/dataSource/OrderDataSource';
import { ZustandCartDataSource } from '../data/dataSource/zustand/ZustandCartDataSource';
import { CategoryDataSource } from '../data/dataSource/CategoryDataSource';
import {
  ProductRepositoryImpl,
  UserRepositoryImpl,
  CountryRepositoryImpl,
  AddressRepositoryImpl,
  OrderRepositoryImpl,
  CategoryRepositoryImpl
} from '../data/repository';
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
  SaveAddressUseCase,
  SaveDBAddressUseCase,
  DeleteAddressUseCase,
  GetAddressUseCase,
  SaveOrderUseCase,
  ClearCartUseCase,
  GetOrderByIdUseCase,
  GetUserOrdersUseCase,
  SetTransactionUseCase,
  PayOrderUseCase,
  GetPaginatedOrdersUseCase,
  GetPaginatedUsersUseCase,
  ChangeRoleUseCase,
  GetAllCategoriesUseCase,
  SaveProductUseCase,
  DeleteImageUseCase
} from '../domain/useCase';
import { DiContainer } from './container';
import { PRISMA_TYPES } from './prisma/types';
import { bindPrisma } from './prisma/bindings';
import { bindMemory } from './memory/bindings';
import { ZUSTAND_TYPES } from './zustand/types';
import { bindZustand } from './zustand/bindings';
import { REPOSITORY_TYPES } from './repository/types';
import { bindRepository } from './repository/bindings';

export const diInstance = DiContainer.getInstance();
(function() {
  bindPrisma();
  bindMemory();
  bindZustand();
  bindRepository();
})();

const prismaCategoryDataSource = diInstance.get<PrismaCategoryDataSource>(PRISMA_TYPES.Category)
const zustandCartDataSource = diInstance.get<ZustandCartDataSource>(ZUSTAND_TYPES.Cart)
const prismaUserDataSource = diInstance.get<PrismaUserDataSource>(PRISMA_TYPES.User)
const prismaCountryDataSource = diInstance.get<PrismaCountryDataSource>(PRISMA_TYPES.Country)
const prismaAddressDataSource = diInstance.get<PrismaAddressDataSource>(PRISMA_TYPES.Address)
const prismaOrderDataSource = diInstance.get<PrismaOrderDataSource>(PRISMA_TYPES.Order)

const cartRepository = (source: CartDataSource) => new CartRepositoryImpl(source)
const userRepository = (source: UserDataSource) => new UserRepositoryImpl(source)
const countryRepository = (source: CountryDataSource) => new CountryRepositoryImpl(source)
const addressRepository = (source: AddressDataSource) => new AddressRepositoryImpl(source)
const orderRepository = (source: OrderDataSource) => new OrderRepositoryImpl(source)
const categoryRepository = (source: CategoryDataSource) => new CategoryRepositoryImpl(source)

const productUseCases = (productRepository: ProductRepository) => {
  return {
    GetProductsUseCase: new GetProductsUseCase(productRepository),
    CreateProductUseCase: new CreateProductUseCase(productRepository),
    GetPaginatedProductsUseCase: new GetPaginatedProductsUseCase(productRepository),
    GetProductBySlugUseCase: new GetProductBySlugUseCase(productRepository),
    GetProductStockUseCase: new GetProductStockUseCase(productRepository),
    SaveProductUseCase: new SaveProductUseCase(productRepository),
    DeleteImageUseCase: new DeleteImageUseCase(productRepository)
  }
}

const productRepositoryFactory = diInstance.getFactory<ProductRepositoryImpl>(REPOSITORY_TYPES.Product);
const prismaSource = productUseCases(productRepositoryFactory('prisma') as ProductRepositoryImpl)
const memorySource = productUseCases(productRepositoryFactory('memory') as ProductRepositoryImpl)

const cartUseCases = {
  AddProductToCartUseCase: new AddProductToCartUseCase(cartRepository(zustandCartDataSource)),
  UpdateProductQuantityUseCase: new UpdateProductQuantityUseCase(cartRepository(zustandCartDataSource)),
  RemoveProductFromCartUseCase: new RemoveProductFromCartUseCase(cartRepository(zustandCartDataSource)),
  GetCartSummaryUseCase: new GetCartSummaryUseCase(cartRepository(zustandCartDataSource)),
  SaveAddressUseCase: new SaveAddressUseCase(cartRepository(zustandCartDataSource)),
  ClearCartUseCase: new ClearCartUseCase(cartRepository(zustandCartDataSource))
}

const userUseCases = {
  CreateUserUseCase: new CreateUserUseCase(userRepository(prismaUserDataSource)),
  GetUserByEmail: new GetUserByEmail(userRepository(prismaUserDataSource)),
  SaveUserUseCase: new SaveUserUseCase(userRepository(prismaUserDataSource)),
  GetPaginatedUsersUseCase: new GetPaginatedUsersUseCase(userRepository(prismaUserDataSource)),
  ChangeRoleUseCase: new ChangeRoleUseCase(userRepository(prismaUserDataSource))
}

const countryUseCases = {
  CreateCountryUseCase: new CreateCountryUseCase(countryRepository(prismaCountryDataSource)),
  GetAllCountriesUseCase: new GetAllCountriesUseCase(countryRepository(prismaCountryDataSource))
}

const addressUseCases = {
  SaveDBAddressUseCase: new SaveDBAddressUseCase.SaveAddressUseCase(addressRepository(prismaAddressDataSource)),
  DeleteAddressUseCase: new DeleteAddressUseCase(addressRepository(prismaAddressDataSource)),
  GetAddressUseCase: new GetAddressUseCase(addressRepository(prismaAddressDataSource))
}

const orderUseCases = {
  SaveOrderUseCase: new SaveOrderUseCase(orderRepository(prismaOrderDataSource)),
  GetOrderByIdUseCase: new GetOrderByIdUseCase(orderRepository(prismaOrderDataSource)),
  GetUserOrdersUseCase: new GetUserOrdersUseCase(orderRepository(prismaOrderDataSource)),
  SetTransactionUseCase: new SetTransactionUseCase(orderRepository(prismaOrderDataSource)),
  PayOrderUseCase: new PayOrderUseCase(orderRepository(prismaOrderDataSource)),
  GetPaginatedOrdersUseCase: new GetPaginatedOrdersUseCase(orderRepository(prismaOrderDataSource)),
}

const categoryUseCases = {
  GetAllCategoriesUseCase: new GetAllCategoriesUseCase(categoryRepository(prismaCategoryDataSource))
}

export const di = {
  GetProductsInMemory: memorySource.GetProductsUseCase,
  GetProductsUseCase: prismaSource.GetProductsUseCase,
  CreateProductUseCase: prismaSource.CreateProductUseCase,
  GetPaginatedProductsUseCase: prismaSource.GetPaginatedProductsUseCase,
  GetProductBySlugUseCase: prismaSource.GetProductBySlugUseCase,
  GetProductStockUseCase: prismaSource.GetProductStockUseCase,
  SaveProductUseCase: prismaSource.SaveProductUseCase,
  DeleteImageUseCase: prismaSource.DeleteImageUseCase,

  AddProductToCartUseCase: cartUseCases.AddProductToCartUseCase,
  UpdateProductQuantityUseCase: cartUseCases.UpdateProductQuantityUseCase,
  RemoveProductFromCartUseCase: cartUseCases.RemoveProductFromCartUseCase,
  GetCartSummaryUseCase: cartUseCases.GetCartSummaryUseCase,
  SaveAddressUseCase: cartUseCases.SaveAddressUseCase,
  ClearCartUseCase: cartUseCases.ClearCartUseCase,

  CreateUserUseCase: userUseCases.CreateUserUseCase,
  GetUserByEmail: userUseCases.GetUserByEmail,
  SaveUserUseCase: userUseCases.SaveUserUseCase,
  GetPaginatedUsersUseCase: userUseCases.GetPaginatedUsersUseCase,
  ChangeRoleUseCase: userUseCases.ChangeRoleUseCase,

  CreateCountryUseCase: countryUseCases.CreateCountryUseCase,
  GetAllCountriesUseCase: countryUseCases.GetAllCountriesUseCase,

  SaveDBAddressUseCase: addressUseCases.SaveDBAddressUseCase,
  DeleteAddressUseCase: addressUseCases.DeleteAddressUseCase,
  GetAddressUseCase: addressUseCases.GetAddressUseCase,

  SaveOrderUseCase: orderUseCases.SaveOrderUseCase,
  GetOrderByIdUseCase: orderUseCases.GetOrderByIdUseCase,
  GetUserOrdersUseCase: orderUseCases.GetUserOrdersUseCase,
  SetTransactionUseCase: orderUseCases.SetTransactionUseCase,
  PayOrderUseCase: orderUseCases.PayOrderUseCase,
  GetPaginatedOrdersUseCase: orderUseCases.GetPaginatedOrdersUseCase,

  GetAllCategoriesUseCase: categoryUseCases.GetAllCategoriesUseCase
}
