import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database';
import { User } from '../../../models';
import { JWT } from '../../../utils';

type Data =
| { message:string }
| { token: string, user: { email: string, role: string, name: string } }

const handler = async (req:NextApiRequest, res:NextApiResponse<Data>) => {
  switch (req.method) {
    case 'GET':
      return checkJWT(req, res);
    default:
      return res.status(400).json({ message: 'Método no permitido' });
  }
}


const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.cookies;
  let userID = '';

  try {
    userID = await JWT.isValidToken(token);
  } catch (error) {
    return res.status(401).json({ message: `${error}`});
  }

  await db.connect();
  const user = await User.findById(userID).lean();
  if (!user) {
    return res.status(400).json({ message: 'Usuario no existe' });
  }

  const { _id, email, role, name } = user;

  const newToken = await JWT.signToken(_id, email);
  return res.status(200).json({
    token: newToken,
    user: {
      email,
      role,
      name
    }
  })
}

export default handler;
