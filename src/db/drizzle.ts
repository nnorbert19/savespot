import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
const sql = neon(
  'postgresql://savespot_owner:y0H3ZDMnWpoq@ep-divine-night-a21gs3ct.eu-central-1.aws.neon.tech/savespot?sslmode=require'
);
const db = drizzle(sql);
export default db;
