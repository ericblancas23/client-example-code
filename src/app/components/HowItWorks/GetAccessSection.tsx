import React from "react";

export interface Item {
  label: string;
  value: string;
}

interface Props {
  className: string;
  items: Item[];
  title: string;
  titleClassName: string;
}

export const labelClassName = `
text-[#EAEAEA] text-[11px]/[11px] inter600 tracking-[0.06rem] uppercase
tablet:text-[14px]/[24px] tablet:tracking-[0.08rem] tablet:mr-[17px]
`;

export function GetAccessSection({
  className,
  items,
  title,
  titleClassName,
}: Props) {
  return (
    <div className={className}>
      <div
        className={`
          ${titleClassName} inter700 rounded-t-[20px] mb-[16px] flex items-center justify-center
          text-[18px]/[21.78px] h-[83px]
          tablet2:text-[20px]/[24.2px]
        `}
      >
        {title}
      </div>
      {items.map(({ label, value }) => (
        <React.Fragment key={value}>
          <div className={`tablet:hidden ${labelClassName}`}>{label}</div>
          <div
            className={`inter500 mb-[28px] text-[#FFFFFF] text-[18px]/[24px]`}
          >
            {value}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
