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
