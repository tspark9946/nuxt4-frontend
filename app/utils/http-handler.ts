import type { FetchContext } from 'ofetch';

export async function handle401Error(context: FetchContext): Promise<void> {
  const { $config } = useNuxtApp();
  const authStore = useAuthStore(); // 플러그인에서 useAuthStore를 사용하므로 통일

  try {
    // 1. 서버 API(Nitro)에서 쿠키에 저장된 Refresh Token 가져오기
    const { refreshToken } = await $fetch<{ refreshToken: string }>('/api/get-refresh-token-cookie');

    if (!refreshToken)
      throw new Error('No refresh token found');

    // 2. 토큰 갱신 요청 (인터셉터가 없는 기본 $fetch 사용으로 무한루프 방지)
    // 주의: 백엔드 실제 엔드포인트 구조에 맞게 수정하세요 (/api/v1/auth/refresh 등)
    const { access: newAccessToken } = await $fetch<{ access: string }>(
      `${$config.public.apiBase}/auth/refresh_token`,
      {
        method: 'POST',
        body: { refresh: refreshToken },
      },
    );

    // 3. Store 업데이트
    authStore.setToken(newAccessToken);

    // 4. 원래 요청 재시도 (새 토큰 주입)
    const headers = new Headers(context.options.headers);
    headers.set('Authorization', `Bearer ${newAccessToken}`);

    // 현재 응답 객체에 재시도 결과를 할당하여 호출자에게 전달
    context.response = await $fetch(context.request, {
      ...context.options,
      headers,
    });
  }
  catch (error) {
    // 갱신 실패 시 로그아웃 처리 및 로그인 페이지 이동
    authStore.clearAuth?.();
    await navigateTo($config.public.loginPath);
  }
}
