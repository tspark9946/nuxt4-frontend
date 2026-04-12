// nuxt middleware to protect routes
// 로그인이 되어있지 않은 사용자가 /dashboard 경로에 접근하려고 할 때 홈으로 리다이렉트합니다.

import { auth } from '~~/app/lib/better-auth';

export default defineEventHandler(async (event) => {
  if (event.path.startsWith('/dashboard')) {
    const session = await auth.api.getSession({
      headers: event.headers,
    });

    if (!session) {
      await sendRedirect(event, '/', 302);
    }
  }
});
