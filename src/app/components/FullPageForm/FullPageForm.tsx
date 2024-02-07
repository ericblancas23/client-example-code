import type { ReactNode } from "react";

import type { HeaderProps } from "../Header/types";

interface FullPageFormProps extends HeaderProps {
  /** Page content. */
  children: ReactNode;
}

export function FullPageForm({ children }: FullPageFormProps) {
  return (
    <div className="flex overflow-hidden overscroll-contain">
      <div className="overflow-auto w-full">
        <div className="m-auto max-w-full p-6 w-[636px]">{children}</div>
      </div>
    </div>
  );
}
