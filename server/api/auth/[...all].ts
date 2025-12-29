import { auth } from '~~/app/lib/better-auth';

export default defineEventHandler((event) => {
  return auth.handler(toWebRequest(event));
});
