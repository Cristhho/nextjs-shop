import {
  AddressRepositoryImpl,
  CategoryRepositoryImpl,
  CountryRepositoryImpl,
  OrderRepositoryImpl,
  ProductRepositoryImpl,
  UserRepositoryImpl
} from '@/data/repository';
import { REPOSITORY_TYPES } from './types';
import { PRISMA_TYPES } from '../prisma/types';
import { ProductDataSource } from '@/data/dataSource/ProductDataSource';
import { diInstance } from '../CompositionRoot';
import { CategoryRepository } from '@/domain/repository/CategoryRepositort';
import { CartRepository } from '@/domain/repository/CartRepository';
import { CartRepositoryImpl } from '@/data/repository/CartRepositoryImpl';
import { AddressRepository } from '@/domain/repository/AddressRepository';
import { CountryRepository } from '@/domain/repository/CountryRepository';
import { OrderRepository } from '@/domain/repository/OrderRepository';
import { UserRepository } from '@/domain/repository/UserRepository';

export function bindRepository() {
  diInstance.bindFactory<ProductRepositoryImpl>(REPOSITORY_TYPES.Product, context => {
    return (dataSourceName: string) => {
      const dataSource = context.container.getNamed<ProductDataSource>(PRISMA_TYPES.Product, dataSourceName);
      return new ProductRepositoryImpl(dataSource);
    }
  });

  diInstance.bindSingleton<CategoryRepository, CategoryRepositoryImpl>(REPOSITORY_TYPES.Category, CategoryRepositoryImpl)
  diInstance.bindSingleton<CartRepository, CartRepositoryImpl>(REPOSITORY_TYPES.Cart, CartRepositoryImpl)
  diInstance.bindSingleton<AddressRepository, AddressRepositoryImpl>(REPOSITORY_TYPES.Address, AddressRepositoryImpl)
  diInstance.bindSingleton<CountryRepository, CountryRepositoryImpl>(REPOSITORY_TYPES.Country, CountryRepositoryImpl)
  diInstance.bindSingleton<OrderRepository, OrderRepositoryImpl>(REPOSITORY_TYPES.Order, OrderRepositoryImpl)
  diInstance.bindSingleton<UserRepository, UserRepositoryImpl>(REPOSITORY_TYPES.User, UserRepositoryImpl)
}
