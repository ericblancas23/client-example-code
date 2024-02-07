import type { ReactNode } from "react";

interface FooterProps {
  /** Content to display in footer. */
  children?: ReactNode;
}

export function Footer({ children }: FooterProps) {
  return children ? (
    <div className="bg-white border-[#D0D0D0] border-[1px] bottom-0 w-full flex gap-2 justify-center p-4 sticky">
      {children}
    </div>
  ) : (
    <></>
  );
}
