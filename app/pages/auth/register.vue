<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

import * as z from 'zod';

const schema = z.object({
  name: z.string().trim().min(5, 'Name must bie at least 5 characters'),
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Password don\'t match',
  path: ['confirmPassword'],
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: '',
  password: '',
  name: '',
  confirmPassword: '',
});

const { signUp } = useAuth();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { error } = await signUp.email({
    email: event.data.email,
    password: event.data.password,
    name: event.data.name,
    callbackURL: '/',
  });
  console.log(error);
}
</script>

<template>
  <u-container class="flex items-center justify-center sm:p-4 sm:min-w-160">
    <u-card class="w-full max-w-md">
      <template #header>
        <div class="text-center p-4">
          <h1 class="text-xl font-semibold">
            Create Your account
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
          >
            Github
          </u-button>
        </div>
        <u-separator label="or" />
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField label="Name" name="name">
            <UInput v-model="state.name" class="w-full" />
          </UFormField>
          <UFormField label="Email" name="email">
            <UInput v-model="state.email" class="w-full" />
          </UFormField>

          <UFormField label="Password" name="password">
            <UInput v-model="state.password" type="password" class="w-full" />
          </UFormField>
          <UFormField label="Confirm Password" name="confirmPassword">
            <UInput v-model="state.confirmPassword" type="password" class="w-full" />
          </UFormField>

          <UButton type="submit" color="primary" block>
            Create Account
          </UButton>
        </UForm>
      </div>
      <div class="text-center text-sm">
        Already have an account?
        <UButton
          variant="link"
          color="primary"
          :disabled="false"
          to="/auth/login"
          class="-ml-2"
        >
          Sign in
        </UButton>
      </div>
    </u-card>
  </u-container>
</template>

<style scoped>

</style>
