import { db } from '@/db'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import NextAuth from "next-auth"
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import GoogleProvider from "next-auth/providers/google"
import { Adapter } from 'next-auth/adapters';

const handler = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST }

