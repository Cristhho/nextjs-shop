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

export const oAuthToDB = async (email: string, name: string) => {
  await db.connect();
  const user = await User.findOne({ email });
  
  if (user) {
    await db.disconnect();
    return {
      _id: user._id,
      name: user.name,
      email: user.email.toLowerCase(),
      role: user.role
    }
  }

  const newUser = new User({ email, name, password: '@', role: 'client' });
  await newUser.save();
  await db.disconnect();
  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email.toLowerCase(),
    role: newUser.role
  }
}