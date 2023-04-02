import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { isValidObjectId } from 'mongoose';
import axios from 'axios';

import { Paypal } from '../../../interfaces';
import { db } from '../../../database';
import { Order } from '../../../models';

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  switch (req.method) {
    case 'POST':
      return payOrder(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }

}

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

  const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`, 'utf-8').toString('base64');
  const body = new URLSearchParams('grant_type=client_credentials');

  try {
    const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
      headers: {
        'Authorization': `Basic ${base64Token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }

    return null;
  }
}

const payOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  const {transactionid='', orderId=''} = req.body;
  if (!isValidObjectId(orderId)){
    return res.status(401).json({ message: 'Orden no existe' });;
  }

  const session: any = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Debe estar autenticado para proceder.' });
  }

  await db.connect();
  const dbOrder = await Order.findById(orderId);

  if (!dbOrder) {
    await db.disconnect();
    return res.status(401).json({ message: 'Orden no existe en base' });
  }
  if (dbOrder.user != session.user._id) {
    await db.disconnect();
    return res.status(401).json({ message: 'Orden no pertenece a su usuario' });
  }

  const paypalToken = await getPaypalBearerToken();
  if (!paypalToken) {
    return res.status(400).json({ message: 'No se pudo generar el token de paypal' });
  }

  const { data } = await axios.get<Paypal.PaypalOrderStatusResponse>(`${process.env.PAYPAL_ORDERS_URL}/${transactionid}` || '', {
    headers: {
      'Authorization': `Bearer ${paypalToken}`
    }
  });
  console.log(data);

  if (data.status !== 'COMPLETED') {
    return res.status(401).json({ message: 'Orden no encontrada' });
  }

  if (dbOrder.total !== +data.purchase_units[0].amount.value) {
    await db.disconnect();
    return res.status(401).json({ message: 'Los montos no son iguales' });
  }

  dbOrder.transactionId = transactionid;
  dbOrder.isPaid = true;
  await dbOrder.save();

  await db.disconnect();

  return res.status(200).json({ message: paypalToken });
}