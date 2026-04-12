// `defineStore()`의 반환 값(함수)을 할당할 변수의 이름은 원하는 대로 지정할 수 있지만,
// 스토어 이름을 사용하고 `use`와 `Store`로 묶는 것이 가장 좋습니다.
// 예: `useUserStore`, `useCartStore`, `useProductStore`
// 첫 번째 인자는 앱 전체에서 스토어의 고유 ID입니다.

/** Global Store */
export const useGlobalStore = defineStore(
  'useGlobalStore',
  () => {
    // State
    /** Loading overlay */
    const loading: Ref<boolean> = ref(true);
    /** ProgressBar Percentage */
    const progress: Ref<number | null> = ref(null);
    /** SnackBar Text */
    const message: Ref<string> = ref('test message');
    const count = ref(0);

    // Getters
    const doubleCount = computed(() => count.value * 2);

    // Actions
    /** Show loading Overlay */
    function setLoading(display: boolean) {
      loading.value = display;
      if (!display) {
        // Reset Progress value
        progress.value = null;
      }
    }

    /** Update progress value */
    function setProgress(v: number | null = null) {
      // update progress value
      progress.value = v;
      // display loading overlay
      loading.value = true;
    }

    /** Show snackbar message */
    function setMessage(msg = '') {
      // put snackbar text
      message.value = msg;
    }

    return {
      loading,
      progress,
      message,
      doubleCount,
      setLoading,
      setProgress,
      setMessage,
    };
  },
  {
    persist: true,
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
}
