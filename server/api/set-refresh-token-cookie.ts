// https://cychann.tistory.com/entry/JWT-in-Nuxt3 참조
import env from '~/lib/env';

export default defineEventHandler(async (event) => {
  const { refreshToken } = await readBody(event);

  setCookie(event, 'refreshToken', refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: true,
    maxAge: 60 * 60 * 24 * 30,
  });
});
