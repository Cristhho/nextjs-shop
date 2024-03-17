import { CartDataSource } from '@/data/dataSource/CartDataSource';
import { ZustandCartDataSource } from '@/data/dataSource/zustand/ZustandCartDataSource';
import { ZUSTAND_TYPES } from './types';
import { diInstance } from '../CompositionRoot';

export function bindZustand() {
  diInstance.bindSingleton<CartDataSource, ZustandCartDataSource>(ZUSTAND_TYPES.Cart, ZustandCartDataSource);
}
