//@ts-ignore
import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { Adapter } from 'next-auth/adapters';
import db from '@/db/drizzle';
import { Session, User } from '@auth/core/types';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      session.user!.id = user.id;
      return session;
    },
  },
  adapter: DrizzleAdapter(db) as unknown as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};
export const getServerAuthSession = () => getServerSession(authOptions); //(6)
