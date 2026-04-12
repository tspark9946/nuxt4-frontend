import { createAuthClient } from 'better-auth/vue';

const authClient = createAuthClient();

export const useBetterAuthStore = defineStore('useBetterAuthStore', () => {
  const session = authClient.useSession();
  const user = computed(() => session.value.data?.user);
  const loading = computed(() => session.value.isPending || session.value.isRefetching);
  // const signInEmail = authClient.signIn.email;

  async function signIn() {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/auth/callback',
      errorCallbackURL: '/error',
    });
  }

  async function signInWithEmail(email: string, password: string) {
    await authClient.signIn.email({
      email,
      password,
      callbackURL: '/auth/callback',
    });
  }

  async function signOut() {
    await authClient.signOut();
  }

  return {
    loading,
    signIn,
    signInWithEmail,
    signOut,
    user,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBetterAuthStore, import.meta.hot));
}
