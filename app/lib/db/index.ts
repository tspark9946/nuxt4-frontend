import { drizzle } from 'drizzle-orm/mysql2';

import env from '../env';

const db = drizzle({
  connection: { uri: env.PMS_DATABASE_URL },
  casing: 'snake_case',
});

export default db;
