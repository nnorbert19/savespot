import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
// @ts-ignore

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);
export default db;
