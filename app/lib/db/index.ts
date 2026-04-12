// https://www.youtube.com/watch?v=DK93dqmJJYg 1:10경 강의 참고하여 작성한 코드입니다.
// Drizzle ORM을 사용하여 MySQL 데이터베이스에 연결하는 설정입니다
import { drizzle } from 'drizzle-orm/mysql2';

import env from '../env';

const db = drizzle({
  connection: { uri: env.PMS_DATABASE_URL },
  casing: 'snake_case',
});

export default db;
