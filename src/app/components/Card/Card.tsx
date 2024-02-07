import type { CardProps } from "./types";

export default function Card({ children, title }: CardProps) {
  return (
    <section className="bg-white flex flex-col items-center mt-6 p-6 rounded-2xl w-[25em]">
      <header
        className={`inter700 leading-7 mb-3 text-[#525766] text-2xl text-center tracking-[-0.03em]`}
      >
        {title}
      </header>
      <div className={`inter500 text-[#525766] text-sm w-full`}>{children}</div>
    </section>
  );
}
