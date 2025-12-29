<script setup lang="ts">
const authStore = useAuthStore();
onMounted(async () => {
  await authStore.signOut();
  navigateTo('/');
});
</script>

<template>
  <div class="card container mt-4 min-h-72 text-center mx-auto flex flex-col justify-center items-center gap-4 ">
    Sign out
  </div>
</template>

<style scoped>

</style>
