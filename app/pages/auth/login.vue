<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

import * as z from 'zod';

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: '',
  password: '',
});

const error = ref('');
const loding = ref(false);

const authStore = useAuthStore();
const { signIn } = useAuth();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  error.value = '';
  loding.value = true;
  try {
    const success = await authStore.login(event.data.email, event.data.password);
    if (success) {
      navigateTo('/');
    }
    else {
      error.value = 'Invalid email or password';
    }
  }
  catch (err) {
    error.value = 'An error occurred while logging in';
  }
  finally {
    loding.value = false;
  }
}
</script>

<template>
  <u-container class="flex items-center justify-center sm:p-4 sm:min-w-160">
    <u-card class="w-full max-w-md">
      <template #header>
        <div class="text-center p-4">
          <h1 class="text-xl font-semibold">
            Welcome to NuxtAI
          </h1>
        </div>
      </template>
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <u-button
            color="neutral"
            variant="outline"
            icon="i-simple-icons-google"
            class="justify-center"
            :loading="false"
            :disabled="false"
            @click="signIn.social({ provider: 'google', callbackURL: '/' })"
          >
            Google
          </u-button>
          <u-button
            color="neutral"
            variant="outline"
            icon="i-simple-icons-github"
            class="justify-center"
            :loading="false"
            :disabled="false"
            @click="signIn.social({ provider: 'github', callbackURL: '/auth/callback' })"
          >
            Github
          </u-button>
        </div>
        <u-separator label="or" />
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField label="Email" name="email">
            <UInput v-model="state.email" class="w-full" />
          </UFormField>

          <UFormField label="Password" name="password">
            <UInput v-model="state.password" type="password" class="w-full" />
          </UFormField>

          <UButton type="submit" color="primary" block>
            Sign in
          </UButton>
        </UForm>
      </div>
      <div class="text-center text-sm">
        Don't have an account
        <UButton
          variant="link"
          color="primary"
          :disabled="false"
          to="/auth/register"
          class="-ml-2"
        >
          Create Now
        </UButton>
      </div>
    </u-card>
  </u-container>
</template>

<style scoped>

</style>
