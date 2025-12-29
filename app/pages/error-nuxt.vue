<script setup lang="ts">
const route = useRoute();
const error = route.query.error || 'An unknown error occurred.';
</script>

<template>
  <UError
    redirect="/"
    :error="{
      statusCode: 404,
      statusMessage: 'Page not found',
      message: error,
    }"
  />
</template>
