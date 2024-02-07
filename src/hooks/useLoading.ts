import { useBool } from "./useBool";

/**
 * React hook for managing loading state. Similar to useState but provides methods for setting and toggling
 * that are stable (use useCallback).
 *
 * @param initialValue initial value
 * @returns object containing "loading" as well as "stopLoading", "startLoading", and "toggle" callbacks
 */
export function useLoading(initialValue: boolean) {
  const { setFalse, setTrue, toggle, value } = useBool(initialValue);

  return {
    loading: value,
    stopLoading: setFalse,
    startLoading: setTrue,
    toggle,
  };
}
