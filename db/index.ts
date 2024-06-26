import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
// import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from './schema';
import postgres from 'postgres';

declare global {
  var db: PostgresJsDatabase<typeof schema>;
}
let db: PostgresJsDatabase<typeof schema>;
if (process.env.NODE_ENV === 'production') {
  db = drizzle(postgres(process.env.DATABASE_URL!), { schema });
} else {
  if (!global.db) {
    global.db = drizzle(postgres(process.env.DATABASE_URL!), { schema });
  }
  db = global.db;
}
export { db };
