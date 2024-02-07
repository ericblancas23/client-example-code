import { GradientText } from "../GradientText";

interface SectionTitleProps {
  as: "h1" | "h2";
  title: string;
}

export function SectionTitle({ as, title }: SectionTitleProps) {
  return (
    <>
      <GradientText
        as={as}
        className={`inter800 text-[32px]/[40px] -tracking-[0.05rem] tablet:text-[56px]/[64px]`}
      >
        {title}
      </GradientText>
      <hr className="border-[#454965] border-2 h-1 my-6 lg:mb-7 rounded-3xl w-8" />
    </>
  );
}
