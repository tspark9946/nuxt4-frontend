import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

import env from './app/lib/env';

export default defineConfig({
  out: './app/lib/db/migrations',
  schema: './app/lib/db/schema/index.ts',
  casing: 'snake_case',
  dialect: 'mysql',
  dbCredentials: {
    url: env.PMS_DATABASE_URL,
  },
});
