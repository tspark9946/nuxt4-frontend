<script setup lang="ts">
const route = useRoute();
const error = route.query.error || 'An unknown error occurred.';
</script>

<template>
  <div class="card container mt-4 min-h-72 text-center mx-auto flex flex-col justify-center items-center gap-4 ">
    <UAlert
      title="Heads up!"
      :description="error"
    />
    <NuxtLink to="/" class="bg-primary flex flex-row justify-center items-center">
      Home
      <Icon name="tabler:arrow-left" size="32" />
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>
