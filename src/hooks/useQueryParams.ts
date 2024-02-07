import { useLocation } from "react-router-dom";
import { useMemo } from "react";

/**
 * React hook for getting query params
 *
 * @returns object reprsenting the query params in the current URL
 */
export function useQueryParams() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
