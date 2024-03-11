import {
  PrismaAddressDataSource,
  PrismaCategoryDataSource,
  PrismaCountryDataSource,
  PrismaOrderDataSource,
  PrismaProductDataSource,
  PrismaUserDataSource
} from '@/data/dataSource';
import { CategoryDataSource } from '@/data/dataSource/CategoryDataSource';
import { ProductDataSource } from '@/data/dataSource/ProductDataSource';
import { UserDataSource } from '@/data/dataSource/UserDataSource';
import { CountryDataSource } from '@/data/dataSource/CountryDataSource';
import { OrderDataSource } from '@/data/dataSource/OrderDataSource';
import { AddressDataSource } from '@/data/dataSource/AddressDataSource';
import { PRISMA_TYPES } from './types';
import { diInstance } from '../DependenciesLocator';

export function bindPrisma() {
  diInstance.bindSingleton<CategoryDataSource, PrismaCategoryDataSource>(PRISMA_TYPES.Category, PrismaCategoryDataSource);
  diInstance.bindSingleton<ProductDataSource, PrismaProductDataSource>(PRISMA_TYPES.Product, PrismaProductDataSource, { targetName: 'prisma' });
  diInstance.bindSingleton<UserDataSource, PrismaUserDataSource>(PRISMA_TYPES.User, PrismaUserDataSource);
  diInstance.bindSingleton<CountryDataSource, PrismaCountryDataSource>(PRISMA_TYPES.Country, PrismaCountryDataSource);
  diInstance.bindSingleton<OrderDataSource, PrismaOrderDataSource>(PRISMA_TYPES.Order, PrismaOrderDataSource);
  diInstance.bindSingleton<AddressDataSource, PrismaAddressDataSource>(PRISMA_TYPES.Address, PrismaAddressDataSource);
}
