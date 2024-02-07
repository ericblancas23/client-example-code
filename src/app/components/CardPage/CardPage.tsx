import type { ReactNode } from "react";

import { Logo } from "../Logo";
import Card from "../Card/Card";
import type { CardProps } from "../Card/types";

interface CardPageProps extends CardProps {
  /** Optional content to display below card. */
  footer?: ReactNode;
}

export default function CardPage({ children, footer, title }: CardPageProps) {
  return (
    <main className="bg-[#EAEAEC] flex flex-col min-h-screen items-center justify-center p-6 w-screen">
      <Logo />
      <Card title={title}>{children}</Card>
      {footer ? (
        <div
          className={`inter500 flex items-center mt-[1.875rem] text-[#64656F] text-sm`}
        >
          {footer}
        </div>
      ) : null}
    </main>
  );
}
