import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { dbUsers } from '../../../database';

export default NextAuth({
  providers: [
    Credentials({
      name: 'Custom login',
      credentials: {
        email: {
          label: 'Correo',
          type: 'email',
          placeholder: 'correo@google.com'
        },
        password: {
          label: 'Contraseña',
          type: 'password',
          placeholder: 'Contraseña'
        }
      },
      async authorize(credentials) {
        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.access_token = account.access_token;
        if (account.type === 'credentials') {
          token.user = user;
        } else if (account.type === 'oauth') {

        }
      }
      return token;
    },
    async session({ session, token, user }) {
      session.access_token = token.access_token;
      session.user = token.user as any;
      return session;
    }
  }
});
