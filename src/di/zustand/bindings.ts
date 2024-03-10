import { CartDataSource } from '@/data/dataSource/CartDataSource';
import { ZustandCartDataSource } from '@/data/dataSource/zustand/ZustandCartDataSource';
import { diInstance } from '../DependenciesLocator';
import { ZUSTAND_TYPES } from './types';

export function bindZustand() {
  diInstance.bindSingleton<CartDataSource, ZustandCartDataSource>(ZUSTAND_TYPES.Cart, ZustandCartDataSource);
}
