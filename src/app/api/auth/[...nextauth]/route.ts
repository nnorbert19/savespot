import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { Adapter } from 'next-auth/adapters';
import db from '@/db/drizzle';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  adapter: DrizzleAdapter(db) as unknown as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
