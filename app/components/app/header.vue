<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

const route = useRoute();
const { toggle } = useSidebar();
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const userName = computed(() => authStore.user?.name || '');
// 여러 속성을 가져올때는 아래와 같이 storeToRefs를 사용하는 것이 좋습니다.
// const { isAuthenticated } = storeToRefs(authStore);

const logItems = ref<DropdownMenuItem[]>([
  {
    label: 'Sign out',
    icon: 'tabler:logout-2',
    onSelect: async () => {
      await authStore.logout();
    },
  },
]);

const items = computed(() => [{
  label: 'Docs',
  to: '/docs',
  active: route.path.startsWith('/docs'),
}, {
  label: '예약 및 현황',
  to: '/register',
}, {
  label: '진료',
  to: '/treatment',
}, {
  label: '입원 및 호텔',
  to: '/hospitalization',
}, {
  label: '미용',
  to: '/beauty',
}]);
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-panel-left"
        aria-label="Toggle sidebar"
        @click="toggle"
      />
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UColorModeButton />

      <UButton
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        to="/login"
        class="lg:hidden"
      />
      <UDropdownMenu
        v-if="isAuthenticated && userName"
        :items="logItems"
        :content="{
          align: 'start',
          side: 'bottom',
          sideOffset: 8,
        }"
        :ui="{
          content: 'w-48',
        }"
      >
        <UButton :label="userName" icon="i-lucide-menu" color="neutral" variant="outline" />
      </UDropdownMenu>
      <u-button
        v-else
        label="Sign in"
        color="neutral"
        variant="outline"
        to="/login"
        class="hidden lg:inline-flex"
      />

      <UButton
        label="Sign up"
        color="neutral"
        trailing-icon="i-lucide-arrow-right"
        class="hidden lg:inline-flex"
        to="/auth/register"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-6" />

      <UButton
        label="Sign in"
        color="neutral"
        variant="subtle"
        to="/login"
        block
        class="mb-3"
      />
      <UButton
        label="Sign up"
        color="neutral"
        to="/auth/register"
        block
      />
    </template>
  </UHeader>
</template>
