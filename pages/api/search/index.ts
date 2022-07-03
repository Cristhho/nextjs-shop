import { NextApiRequest, NextApiResponse } from 'next';

type Data = { message:string };

const handler = (req:NextApiRequest, res:NextApiResponse<Data>) => {
  res.status(400).json({ message: 'Debe ingresar la cadena de busqueda.' });
}

export default handler;
