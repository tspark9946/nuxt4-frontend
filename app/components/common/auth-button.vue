<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

const authStore = useAuthStore();

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Sign out',
    icon: 'tabler:logout-2',
    to: '/sign-out',
  },
]);
</script>

<template>
  <UDropdownMenu
    v-if="!authStore.loading && authStore.user"
    :items="items"
    :content="{
      align: 'start',
      side: 'bottom',
      sideOffset: 8,
    }"
    :ui="{
      content: 'w-48',
    }"
  >
    <UButton :label="authStore.user.name" icon="i-lucide-menu" color="neutral" variant="outline" />
  </UDropdownMenu>
  <u-button
    v-else
    color="neutral"
    variant="outline"
    icon="i-simple-icons-github"
    class="justify-center"
    :loading="authStore.loading"
    :disabled="authStore.loading"
    @click="authStore.signIn"
  >
    Sign in with Github
  </u-button>
</template>
