import { BaseContent } from "../BaseContent";
import { SectionTitle } from "../SectionTitle/SectionTitle";

interface SectionProps {
  children?: React.ReactNode;
  className?: string;
  id: string;
  title: string;
}

export function Section({ children, className = "", id, title }: SectionProps) {
  return (
    <BaseContent
      as="section"
      className={`${className} pb-4 pt-[16px] px-[16px]
      tablet:pt-[72px] tablet:px-[72px] 
      tablet2:pt-[100px] tablet2:px-[48px]
      `}
      id={id}
    >
      <SectionTitle as="h1" title={title} />
      {children}
    </BaseContent>
  );
}
