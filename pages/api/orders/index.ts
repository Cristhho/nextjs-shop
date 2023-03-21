import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '../../../database';

import { IOrder } from '../../../interfaces';
import { Order, Product } from '../../../models';

type Data = {message: string}
  | IOrder

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);
  
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder;

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Debe estar autenticado para proceder.' });
  }

  const productsId = orderItems.map((p) => p._id);
  await db.connect();

  const dbProducts = await Product.find({ _id: { $in: productsId } });
  try {
    const subTotal = orderItems.reduce((prev, current) => {
      const price = dbProducts.find((prod) => prod.id == current._id)?.price;
      if (!price) throw new Error('Verifique la información del carrito');
      return prev + (price * current.quantity);
    }, 0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const realTotal = subTotal * (taxRate + 1);

    if (total !== realTotal) throw new Error('Monto total tiene errores.');

    const userId = (session.user as any)._id;
    const newOrder = new Order({
      ...req.body,
      isPaid: false,
      user: userId
    });
    await newOrder.save();

    return res.status(201).json(newOrder);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message || 'Revisar logs.' });
  } finally {
    db.disconnect();
  }
}
