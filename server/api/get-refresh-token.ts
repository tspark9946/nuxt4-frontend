export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, 'refreshToken');
  return { refreshToken };
});
