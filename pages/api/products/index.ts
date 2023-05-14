import { NextApiRequest, NextApiResponse } from 'next';

import { Product } from '@/domain/model';
import { ProductRepository } from '@/domain/repository';
import { GetProductsUseCase } from '@/domain/useCase';
import { MongoProductDataSource } from '@/data/dataSource/db/MongoProductDataSource';
import { ProductRepositoryImpl } from '@/data/repository/ProductRepositoryImpl';

type Data =
| { message: string }
| Product[];

const handler = async (req:NextApiRequest, res:NextApiResponse<Data>) => {
  const mongoProductDataSource = new MongoProductDataSource();
  const productRepository = new ProductRepositoryImpl(mongoProductDataSource);
  switch (req.method) {
    case 'GET':
      const { gender = 'all' } = req.query;
      const data = await getProducts(productRepository, gender.toString());
      return res.status(200).json(data);
  
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
};

export const getProducts = async (productRepository: ProductRepository, gender: string) => {
  const getProductsUseCase = new GetProductsUseCase(productRepository);

  const products = await getProductsUseCase.excecute(gender);

  return products;
}

export default handler;
