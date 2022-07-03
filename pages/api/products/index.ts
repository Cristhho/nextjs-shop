import { NextApiRequest, NextApiResponse } from 'next';

import { db, SHOP_CONSTANTS } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data =
| { message: string }
| IProduct[];

const handler = async (req:NextApiRequest, res:NextApiResponse<Data>) => {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
  
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
};

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { gender = 'all' } = req.query;
  let condition = {};
  if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
    condition = { gender }
  }
  await db.connect();

  const products = await Product.find(condition)
    .select('images inStock title slug price -_id').lean();

  await db.disconnect();

  return res.status(200).json(products);
}

export default handler;