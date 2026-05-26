<script setup lang="ts">
const { isOpen } = useSidebar();
</script>

<template>
  <div class="flex flex-col h-screen">
    <app-header class="shrink-0 border-b" />
    <div class="flex flex-1 min-h-0 overflow-hidden">
      <AppLeftSidebar v-model:open="isOpen" variant="sidebar" collapsible="offcanvas" side="left" />
      <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
        <u-main class="flex-1 overflow-y-auto p-4">
          <slot />
        </u-main>
        <u-separator icon="i-simple-icons-nuxtdotjs" type="dashed" class="h-px" />
        <app-footer />

      </div>
    </div>
  </div>
</template>
