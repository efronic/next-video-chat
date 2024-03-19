import { db } from '@/db'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import NextAuth from "next-auth"

const handler = NextAuth({
  adapter: DrrizleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST }

function DrrizleAdapter(db: PostgresJsDatabase<typeof import("@/db/schema")>): import("next-auth/adapters").Adapter | undefined {
    throw new Error('Function not implemented.')
}
function GoogleProvider(arg0: { clientId: string | undefined; clientSecret: string | undefined; }): import("next-auth/providers/index").Provider {
    throw new Error('Function not implemented.');
}

