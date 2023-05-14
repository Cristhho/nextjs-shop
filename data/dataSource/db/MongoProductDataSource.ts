import { Product } from '@/domain/model';
import { ProductDataSource } from '../ProductDataSource';
import { mongoDb } from './mongoDb';
import { Product as ProductEntity } from './entity';
import { SHOP_CONSTANTS } from '../../utils';

export class MongoProductDataSource implements ProductDataSource {
  async getProducts(gender: string): Promise<Product[]> {
    let condition = {};
    if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
      condition = { gender };
    }

    await mongoDb.connect();
    const products = await ProductEntity.find(condition)
      .select('images inStock title slug price -_id')
      .lean();
    await mongoDb.disconnect();

    return JSON.parse(JSON.stringify(products));
  }
  
  getProductBySlug(slug: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  
}