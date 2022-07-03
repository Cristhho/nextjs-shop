import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data =
| { message: string }
| IProduct;

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
  const { slug } = req.query;
  
  switch (req.method) {
    case 'GET':
      return getProduct(slug as string, res);
    
    default:
      return res.status(400).json({ message: 'Método no permitido' });
  }
}

const getProduct = async (slug: string, res: NextApiResponse<Data>) => {
  await db.connect();

  const condition = {
    slug
  };
  const product = await Product.findOne(condition).lean();

  await db.disconnect();

  if (!product) {
    return res.status(404).json({ message: 'Producto no existe' });
  }

  return res.status(200).json(product);
};

export default handler;
