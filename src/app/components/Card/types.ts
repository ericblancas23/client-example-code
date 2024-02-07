import type { ReactNode } from "react";

export interface CardProps {
  /** Content to render in card. */
  children: ReactNode;

  /** Title to render in card. */
  title: ReactNode;
}
