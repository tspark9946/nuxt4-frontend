import { config } from 'zod';

interface Tel {
  tel_id: number;
  client_id: number;
  tel_number: string;
  tel_name: string | null;
  tel_default: boolean | null;
  tel_type: number; // 0: tel, 1: mobile, 2: email
  tel_allow_phone: boolean;
  tel_allow_sms: boolean;
  tel_allow_email: boolean;
  created_at: string | null;
  created_sign_id: number | null;
  created_sign_name: string | null;
  updated_at: string | null;
  updated_sign_id: number | null;
  updated_sign_name: string | null;
}

interface Client {
  client_id?: number;
  client_serial: number;
  client_name: string | null;
  client_zip: string | null;
  client_address1: string | null;
  client_address2: string | null;
  client_email: string | null;
  client_etc: string | null;
  client_firstdate: string | null;
  client_debt: number | string;
  client_resmoney: number | string;
  client_point: number | string;
  client_memo1: string | null;
  client_memo1_encoded: string | null;
  client_memo2: string | null;
  client_memo2_encoded: string | null;
  client_alert: number;
  client_state: boolean;
  hospital_id?: number;
  rank_id?: number;
  created_at?: string;
  created_sign_id?: number;
  created_sign_name?: string;
  updated_at?: string;
  updated_sign_id?: number;
  updated_sign_name?: string;
  tels?: Tel[];
}

interface ClientCreatePayload {
  client_serial: number;
  client_name: string | null;
  client_zip?: string | null;
  client_address1?: string | null;
  client_address2?: string | null;
  client_email?: string | null;
  client_etc?: string | null;
  client_firstdate?: string | null;
  client_debt?: number | string;
  client_resmoney?: number | string;
  client_point?: number | string;
  client_memo1?: string | null;
  client_memo1_encoded?: string | null;
  client_memo2?: string | null;
  client_memo2_encoded?: string | null;
  client_alert?: number;
  client_state?: boolean;
  rank_id?: number;
  tels?: Omit<Tel, 'tel_id' | 'client_id' | 'created_at' | 'updated_at' | 'created_sign_id' | 'created_sign_name' | 'updated_sign_id' | 'updated_sign_name'>[];
}

interface ClientUpdatePayload {
  client_serial?: number;
  client_name?: string | null;
  client_zip?: string | null;
  client_address1?: string | null;
  client_address2?: string | null;
  client_email?: string | null;
  client_etc?: string | null;
  client_firstdate?: string | null;
  client_debt?: number | string;
  client_resmoney?: number | string;
  client_point?: number | string;
  client_memo1?: string | null;
  client_memo1_encoded?: string | null;
  client_memo2?: string | null;
  client_memo2_encoded?: string | null;
  client_alert?: number;
  client_state?: boolean;
  rank_id?: number;
  tels?: Omit<Tel, 'tel_id' | 'client_id' | 'created_at' | 'updated_at' | 'created_sign_id' | 'created_sign_name' | 'updated_sign_id' | 'updated_sign_name'>[];
}

interface TelCreatePayload {
  tel_number: string;
  tel_name: string | null;
  tel_default?: boolean | null;
  tel_type?: number; // 0: tel, 1: mobile, 2: email
  tel_allow_phone?: boolean;
  tel_allow_sms?: boolean;
  tel_allow_email?: boolean;
}

interface TelUpdatePayload {
  tel_number?: string;
  tel_name?: string | null;
  tel_default?: boolean | null;
  tel_type?: number;
  tel_allow_phone?: boolean;
  tel_allow_sms?: boolean;
  tel_allow_email?: boolean;
}

export const useClientStore = defineStore('client', () => {
  const { $api } = useNuxtApp();
  const config = useRuntimeConfig();

  // --- State ---
  const clients = ref<Client[]>([]);
  const currentClient = ref<Client | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const totalCount = ref(0);

  // --- Getters ---
  const clientCount = computed(() => clients.value.length);
  const hasError = computed(() => error.value !== null);

  // --- Helper Functions ---
  const handleError = (err: any) => {
    console.error('Client Store Error:', err);
    error.value = err.data?.message || err.message || 'An error occurred';
  };

  const clearError = () => {
    error.value = null;
  };

  // --- Client CRUD Actions ---

  /**
   * Create a new client
   */
  async function createClient(clientData: ClientCreatePayload) {
    loading.value = true;
    clearError();
    const currentToken = localStorage.getItem('token');
    try {
      const response = await $api<Client>
      (`${config.public.apiBase}/client`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
        body: clientData,
      });
      clients.value.push(response);
      return response;
    }
    catch (err) {
      handleError(err);
      throw err;
    }
    finally {
      loading.value = false;
    }
  }

  /**
   * Get all clients with pagination
   */
  async function fetchClients(skip: number = 0, limit: number = 100) {
    loading.value = true;
    clearError();
    try {
      const response = await $api<Client[]>('/api/client', {
        query: { skip, limit },
      });
      clients.value = response;
      totalCount.value = response.length;
      return response;
    }
    catch (err) {
      handleError(err);
      throw err;
    }
    finally {
      loading.value = false;
    }
  }

  /**
   * Get a single client by ID
   */
  async function fetchClientById(clientId: number) {
    loading.value = true;
    clearError();
    try {
      const response = await $api<Client>(`/api/client/${clientId}`);
      currentClient.value = response;
      return response;
    }
    catch (err) {
      handleError(err);
      throw err;
    }
    finally {
      loading.value = false;
    }
  }

  /**
   * Update an existing client
   */
  async function updateClient(clientId: number, clientData: ClientUpdatePayload) {
    loading.value = true;
    clearError();
    try {
      const response = await $api<Client>(`/api/client/${clientId}`, {
        method: 'PUT',
        body: clientData,
      });
      // Update in the list
      const index = clients.value.findIndex(c => c.client_id === clientId);
      if (index !== -1) {
        clients.value[index] = response;
      }
      // Update current client if it's the same one
      if (currentClient.value?.client_id === clientId) {
        currentClient.value = response;
      }
      return response;
    }
    catch (err) {
      handleError(err);
      throw err;
    }
    finally {
      loading.value = false;
    }
  }

  /**
   * Delete a client
   */
  async function deleteClient(clientId: number) {
    loading.value = true;
    clearError();
    try {
      await $api(`/api/client/${clientId}`, {
        method: 'DELETE',
      });
      // Remove from the list
      clients.value = clients.value.filter(c => c.client_id !== clientId);
      // Clear current client if it's the same one
      if (currentClient.value?.client_id === clientId) {
        currentClient.value = null;
      }
      return true;
    }
    catch (err) {
      handleError(err);
      throw err;
    }
    finally {
      loading.value = false;
    }
  }

  // --- Tel/Phone CRUD Actions ---

  /**
   * Create a new tel/phone for a client
   */
  async function createTel(clientId: number, telData: TelCreatePayload) {
    loading.value = true;
    clearError();
    try {
      const response = await $api<Tel>(`/api/client/${clientId}/tel`, {
        method: 'POST',
        body: telData,
      });
      // Add to current client's tels if applicable
      if (currentClient.value?.client_id === clientId) {
        if (!currentClient.value.tels) {
          currentClient.value.tels = [];
        }
        currentClient.value.tels.push(response);
      }
      return response;
    }
    catch (err) {
      handleError(err);
      throw err;
    }
    finally {
      loading.value = false;
    }
  }

  /**
   * Get all tels for a client
   */
  async function fetchTels(clientId: number) {
    loading.value = true;
    clearError();
    try {
      const response = await $api<Tel[]>(`/api/client/${clientId}/tel/`);
      // Update current client's tels if applicable
      if (currentClient.value?.client_id === clientId) {
        currentClient.value.tels = response;
      }
      return response;
    }
    catch (err) {
      handleError(err);
      throw err;
    }
    finally {
      loading.value = false;
    }
  }

  /**
   * Get a single tel by ID
   */
  async function fetchTelById(clientId: number, telId: number) {
    loading.value = true;
    clearError();
    try {
      const response = await $api<Tel>(`/api/client/${clientId}/tel/${telId}`);
      return response;
    }
    catch (err) {
      handleError(err);
      throw err;
    }
    finally {
      loading.value = false;
    }
  }

  /**
   * Update a tel
   */
  async function updateTel(clientId: number, telId: number, telData: TelUpdatePayload) {
    loading.value = true;
    clearError();
    try {
      const response = await $api<Tel>(`/api/client/${clientId}/tel/${telId}`, {
        method: 'PUT',
        body: telData,
      });
      // Update in current client's tels if applicable
      if (currentClient.value?.client_id === clientId && currentClient.value.tels) {
        const telIndex = currentClient.value.tels.findIndex(t => t.tel_id === telId);
        if (telIndex !== -1) {
          currentClient.value.tels[telIndex] = response;
        }
      }
      return response;
    }
    catch (err) {
      handleError(err);
      throw err;
    }
    finally {
      loading.value = false;
    }
  }

  /**
   * Delete a tel
   */
  async function deleteTel(clientId: number, telId: number) {
    loading.value = true;
    clearError();
    try {
      await $api(`/api/client/${clientId}/tel/${telId}`, {
        method: 'DELETE',
      });
      // Remove from current client's tels if applicable
      if (currentClient.value?.client_id === clientId && currentClient.value.tels) {
        currentClient.value.tels = currentClient.value.tels.filter(t => t.tel_id !== telId);
      }
      return true;
    }
    catch (err) {
      handleError(err);
      throw err;
    }
    finally {
      loading.value = false;
    }
  }

  /**
   * Delete all tels for a client
   */
  async function deleteTelsForClient(clientId: number) {
    loading.value = true;
    clearError();
    try {
      await $api(`/api/client/${clientId}/tel/`, {
        method: 'DELETE',
      });
      // Clear tels from current client if applicable
      if (currentClient.value?.client_id === clientId) {
        currentClient.value.tels = [];
      }
      return true;
    }
    catch (err) {
      handleError(err);
      throw err;
    }
    finally {
      loading.value = false;
    }
  }

  // --- State Reset ---
  const resetStore = () => {
    clients.value = [];
    currentClient.value = null;
    loading.value = false;
    error.value = null;
    totalCount.value = 0;
  };

  return {
    // State
    clients,
    currentClient,
    loading,
    error,
    totalCount,

    // Getters
    clientCount,
    hasError,

    // Helper functions
    clearError,

    // Client actions
    createClient,
    fetchClients,
    fetchClientById,
    updateClient,
    deleteClient,

    // Tel actions
    createTel,
    fetchTels,
    fetchTelById,
    updateTel,
    deleteTel,
    deleteTelsForClient,

    // Reset
    resetStore,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useClientStore, import.meta.hot));
}
