import { Product } from '@/domain/model';
import { ProductDataSource } from '../ProductDataSource';
import { ProductApiEntity } from './entity/ProductApiEntity';
import { tesloApi } from 'api';

export class ProducApiDataSource implements ProductDataSource {
  async getProducts(gender: string): Promise<Product[]> {
    let { data } = await tesloApi.get<ProductApiEntity[]>(`/products?gender=${gender}`);
    return data.map((product) => ({
      ...product
    }))
  }
  
  /* async getProductBySlug(slug: string): Promise<Product> {
    throw new Error('Method not implemented.');
  } */
}