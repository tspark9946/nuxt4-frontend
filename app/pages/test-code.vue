<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const { signIn } = useBetterAuthStore();

const links = ref<ButtonProps[]>([
  {
    label: 'Sign In',
    trailingIcon: 'tabler:brand-github',
    onClick: signIn,
  },

]);
const { data } = await useFetch('/api/sign/all', { server: false });
</script>

<template>
  <UContainer class="bg-elevated mt-4">
 <UPageHero
      title="Skylark Patient Management System"
      description="수의사들을 위한 환자, 병원관리 소프트웨어"
      :links="links"
    />
   <CommonAuthButton />
    <div v-if="data">
      Data: {{ data }}
    </div>
    <a href="/api/sign/all" target="_blank"> To the Endpoint</a>
  </UContainer>
</template>
