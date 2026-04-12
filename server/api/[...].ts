import { joinURL } from 'ufo';

// runtimeconfig를 통해 proxy url을 동적으로 변경해 주기 위해 추가한 코드
// 참고영상 : https://www.youtube.com/watch?v=J4E5uYz5AY8&t=21s

// nuxt.config.ts에 nitro routeRules를 통해 직접설정해도 됨
// nitro: {
//   routeRules: {
//     '/api/**': {
//       // '/api/**'로 시작하는 모든 요청을 FastAPI 서버로 전달
//       proxy: 'http://localhost:8000/api/**',
//     },
//   },
// },

export default defineEventHandler(async (event) => {
  // Get teh runtimeconfig proxy url
  const proxyUrl = useRuntimeConfig().pmsProxyUrl;

  // check the path
  const path = event.path.replace(/^\/api\//, '/api/v1/'); // /api/users -> /api/v1/users
  const target = joinURL(proxyUrl, path);

  // proxy it
  return proxyRequest(event, target);
});
