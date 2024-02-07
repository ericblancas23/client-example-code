import type { ReactNode } from "react";

interface BaseContentProps {
  as?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

export function BaseContent({
  as = "div",
  children,
  className = "",
  id,
}: BaseContentProps) {
  const fullClassName = `
    max-w-7xl lg:mx-auto
     ${className}
  `;

  if (as === "section") {
    return (
      <section className={fullClassName} id={id}>
        {children}
      </section>
    );
  }

  return <div className={fullClassName}>{children}</div>;
}
