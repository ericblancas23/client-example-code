import type { ReactNode } from "react";

interface Breadcrumb {
  label: ReactNode;
  to?: string;
}

export interface HeaderProps {
  /** Actions to display in top right of header. */
  actions?: ReactNode;

  /** Breadcrumbs for navigation. */
  breadcrumbs?: readonly Breadcrumb[];
}
