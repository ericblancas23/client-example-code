import type { ReactNode } from "react";

import { Header } from "./components/Header/Header";
import { Head } from "./components/Head/Head";
import { Footer } from "./components/Footer/Footer";

interface BaseLayoutProps {
  /** Layout content. */
  children: ReactNode;

  /** Document title for page */
  title?: string;
}

export function BaseLayout({ children, title }: BaseLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Head title={title} />
      <Header />
      <div className="flex flex-col flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
