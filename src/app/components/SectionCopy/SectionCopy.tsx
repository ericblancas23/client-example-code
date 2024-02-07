import type { ReactNode } from "react";

interface SectionCopyProps {
  children: ReactNode;
  className?: string;
}

export function SectionCopy({ children, className = "" }: SectionCopyProps) {
  return (
    <div
      className={`inter500 ${className} text-[#F4F4F4] opacity-80 whitespace-pre-line text-[16px]/[28px]`}
    >
      {children}
    </div>
  );
}
