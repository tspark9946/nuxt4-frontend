<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';

import * as z from 'zod';

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
  required: true,
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true,
}];

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
});

const authStore = useAuthStore();
const error = ref('');
const loading = ref(false);

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  error.value = '';
  loading.value = true;
  try {
    const success = await authStore.login(payload.data.email, payload.data.password);
    if (success) {
      navigateTo('/client');
    }
    else {
      error.value = 'Invalid email or password';
    }
  }
  catch (err) {
    error.value = 'An error occurred while logging in';
  }
  finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Login"
        description="Enter your credentials to access your account."
        icon="i-lucide-user"
        :fields="fields"
        :submit="{ label: 'Sign In', color: 'primary', fullWidth: true }"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>
