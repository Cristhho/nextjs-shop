import NextAuth, { type NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import {z} from 'zod';
import bcrypt from 'bcryptjs';

import { diInstance, init } from './di/CompositionRoot';
import { GetUserByEmail } from './domain/useCase';
 
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user
      }
      return token
    },
    session({ session, token, user }) {
      session.user = token.data as any
      return session
    }
  },
  providers: [
    credentials({
      async authorize(credentials) {
        init()
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        
        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data
        
        const user = await diInstance.get<GetUserByEmail>(GetUserByEmail).execute(email)
        if (!user) return null;
        if (!bcrypt.compareSync(password, user.password)) return null;

        const {password: _, ...rest} = user

        return {
          ...rest,
          id: rest.id!
        }
      },
    }),
  ]
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
