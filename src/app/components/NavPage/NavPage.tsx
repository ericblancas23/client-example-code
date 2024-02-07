import type { ReactNode } from "react";

import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import type { HeaderProps } from "../Header/types";

interface NavPageProps extends HeaderProps {
  /** Page content. */
  children: ReactNode;

  /** Footer content. */
  footer?: ReactNode;
}

export function NavPage({ children, footer, ...rest }: NavPageProps) {
  return (
    <div className="bg-[#EAEAEC] flex flex-col w-screen static h-screen">
      <Header {...rest} />
      {children}
      {footer && <Footer>{footer}</Footer>}
    </div>
  );
}
