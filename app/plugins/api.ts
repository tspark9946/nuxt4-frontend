import type { $Fetch, FetchOptions } from 'ofetch';

import { handle401Error } from '@/utils/http-handler';

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();

  const fetchOptions: FetchOptions = {
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      if (authStore.token) {
        options.headers = options.headers || {};
        (options.headers as any).Authorization = `Bearer ${authStore.token}`;
      }
    },
    async onResponseError(context): Promise<void> {
      // 401 에러이고, 이미 재시도한 요청(_retry)이 아닐 때만 실행
      if (context.response.status === 401 && !context.options._retry) {
        // 재시도 플래그 설정
        context.options._retry = true;
        await handle401Error(context);
      }
    },
  };

  const api = $fetch.create(fetchOptions) as $Fetch;

  return {
    provide: {
      api,
    },
  };
});
