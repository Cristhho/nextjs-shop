import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '../../../database';
import { User } from '../../../models';
import { JWT, Validations } from '../../../utils';

type Data =
| { message:string }
| { token: string, user: { email: string, role: string, name: string } }

const handler = async (req:NextApiRequest, res:NextApiResponse<Data>) => {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res);
    default:
      return res.status(400).json({ message: 'Método no permitido' });
  }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '', name = '' } = req.body;
  
  if (password.length < 6) {
    return res.status(400).json({ message: 'La contraseña debe ser de mínimo 6 caracteres' });
  }
  if (name.split(' ').length < 2) {
    return res.status(400).json({ message: 'Debe escribir nombre y apellido' });
  }
  if (!Validations.isValidEmail(email)) {
    return res.status(400).json({ message: 'El correo no es válido' });
  }

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    db.disconnect();
    return res.status(400).json({ message: 'Usuario ya existe' });
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
    name
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error del servidor' });
  }

  const token = await JWT.signToken(newUser._id, email);

  return res.status(200).json({
    token,
    user: {
      email,
      role: 'client',
      name
    }
  });
}

export default handler;
