type User = {
  uid: string;
  hid: string;
  email: string;
  name: string;
};

export const useAuthStore = defineStore('auth', () => {
  // --- State ---
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isAuthenticated = ref(false);
  const loading = ref(true);
  const config = useRuntimeConfig();

  // --- Actions ---
  const setUser = (newUser: User) => {
    user.value = newUser;
    isAuthenticated.value = true;
  };

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  };

  const clearAuth = () => {
    user.value = null;
    token.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('token');
  };

  async function login(email: string, password: string) {
    try {
      const response = await $fetch<{ access_token: string; user: User; refresh_token: string }>
      (`${config.public.apiBase}/auth/login`, {
        method: 'POST',
        body: { sign_email: email, sign_password: password },
      });

      // Set the refresh token in an HTTP-only cookie
      await $fetch('/api/set-refresh-token-cookie', {
        method: 'POST',
        body: { refreshToken: response.refresh_token },
      });

      setToken(response.access_token);
      setUser(response.user);
      return true;
    }
    catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  async function signup(name: string, email: string, password: string) {
    try {
      const response = await $fetch<{ token: string; user: User }>('/api/auth/signup', {
        method: 'POST',
        body: { name, email, password },
      });

      setToken(response.token);
      setUser(response.user);
      return { success: true };
    }
    catch (error: any) {
      return {
        success: false,
        error: error.data?.message || 'Signup failed',
      };
    }
  }

  async function logout() {
    try {
      const currentToken = localStorage.getItem('token');
      if (currentToken) {
        await $fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${currentToken}` },
        });
      }
    }
    finally {
      clearAuth();
      await navigateTo('/');
    }
  }

  async function checkAuth() {
    try {
      const currentToken = localStorage.getItem('token');
      if (!currentToken)
        return false;

      const response = await $fetch<{ user: User }>('/api/auth/me', {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      setToken(currentToken);
      setUser(response.user);
      return true;
    }
    catch {
      clearAuth();
      return false;
    }
    finally {
      loading.value = false;
    }
  }

  return {
    // State
    user,
    token,
    isAuthenticated,
    loading,
    // Actions
    setUser,
    setToken,
    clearAuth,
    login,
    signup,
    logout,
    checkAuth,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
