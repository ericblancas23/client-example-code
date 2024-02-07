import { useCallback, useState } from "react";

/**
 * React hook for managing a piece of boolean state. Similar to useState but provides methods for setting and toggling
 * that are stable (use useCallback).
 *
 * @param initialValue initial value
 * @returns object containing "value" as well as "setFalse", "setTrue", and "toggle" callbacks
 */
export function useBool(initialValue: boolean) {
  const [value, setValue] = useState(initialValue);

  return {
    setFalse: useCallback(() => setValue(false), []),
    setTrue: useCallback(() => setValue(true), []),
    toggle: useCallback(() => setValue((prev) => !prev), []),
    value,
  };
}
