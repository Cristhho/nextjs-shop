import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '../../../database';
import { User } from '../../../models';
import { JWT } from '../../../utils';

type Data =
| { message:string }
| { token: string, user: { email: string, role: string, name: string } }

const handler = async (req:NextApiRequest, res:NextApiResponse<Data>) => {
  switch (req.method) {
    case 'POST':
      return loginUser(req, res);
    default:
      return res.status(400).json({ message: 'Método no permitido' });
  }
}


const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '' } = req.body;
  await db.connect();

  const user = await User.findOne({ email });
  db.disconnect();

  if (!user) {
    return res.status(400).json({ message: 'Correo o contraseña no válidos' });
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return res.status(400).json({ message: 'Correo o contraseña no válidos' });
  }

  const token = await JWT.signToken(user._id, user.email);

  return res.status(200).json({
    token,
    user: {
      email: user.email,
      role: user.role,
      name: user.name
    }
  });
}

export default handler;
