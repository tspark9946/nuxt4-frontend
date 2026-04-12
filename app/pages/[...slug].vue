<script setup lang="ts">
const route = useRoute();
const error = route.query.error || 'An unknown error occurred.';
const event = useRequestEvent();

if (import.meta.server) {
  if (event) {
    setResponseStatus(event, 404, 'Page Not Found');
  }
}
</script>

<template>
  <div>
    <p class="text-sm mb-8">
      Sorry, the page '{{ $route.path }}' you are looking for does not exist.
    </p>
    <UError
      redirect="/"
      :error="{
        statusCode: 404,
        statusMessage: 'Page not found',
        message: error,
      }"
    />
  </div>
</template>
