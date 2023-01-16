import bcrypt from 'bcryptjs';

import { db } from '.';
import { User } from '../models';

export const checkUserEmailPassword = async (email: string, password: string) => {
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) return null;

  if (!bcrypt.compareSync(password, user.password!)) return null;

  return {
    _id: user._id,
    name: user.name,
    email: user.email.toLowerCase(),
    role: user.role
  }
}