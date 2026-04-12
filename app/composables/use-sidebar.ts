export function useSidebar() {
  const isOpen = useState('sidebar-open', () => true);

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  return { isOpen, toggle };
}
