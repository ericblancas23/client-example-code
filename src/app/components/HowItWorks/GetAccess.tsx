import styles from "./GetAccess.module.css";
import { GradientText } from "../GradientText";
import type { Item } from "./GetAccessSection";
import { GetAccessSection, labelClassName } from "./GetAccessSection";

const labels = ["Cost", "Time to hire", "Talent network", "Sourcing"];

const oldItems: Item[] = [
  { label: labels[0], value: "> $10,000" },
  { label: labels[1], value: "45-90 days" },
  { label: labels[2], value: "Limited" },
  { label: labels[3], value: "90% of job" },
];

const newItems: Item[] = [
  { label: labels[0], value: "Free" },
  { label: labels[1], value: "30 days" },
  { label: labels[2], value: "Limitless" },
  { label: labels[3], value: "10% of job" },
];

export function GetAccess() {
  return (
    <div className="bg-[#2c2e3ebf] grid grid-cols-1 mt-3.5 rounded-[24px] col-span-2 p-[16px]">
      <div className="grid grid-cols-1 tablet2:grid-cols-2 gap-4 text-center text-white">
        <div
          className={`rounded-[24px] pl-[24px] pt-[24px] pb-[40px] opacity-90 ${styles.header}`}
        >
          <GradientText
            className={`
            text-[32px]/[38.73px] -tracking-[0.05rem] text-left inter800
            tablet:text-[42px]/[50.83px]
          `}
          >
            {
              "Members get\nconnected to\nhighly vetted\ncandidates right\nin their inbox!"
            }
          </GradientText>
        </div>

        <div className="grid grid-cols-2 tablet:grid-cols-3 tablet2:grid-cols-[max-content_1fr_1fr] gap-[8px]">
          <div className="hidden tablet:block text-right">
            <div className="p-[30px] mb-[16px]">&nbsp;</div>
            {labels.map((label) => (
              <div className={`${labelClassName} mb-[28px]`} key={label}>
                {label}
              </div>
            ))}
          </div>

          <GetAccessSection
            className="bg-[#A0A1AC1A] flex-1 rounded-[20px]"
            items={oldItems}
            title="Old way"
            titleClassName="bg-[#EAEAEA1A]"
          />

          <GetAccessSection
            className="bg-[#1041ED] flex-1 rounded-[20px]"
            items={newItems}
            title="New way"
            titleClassName="bg-[#EAEAEA1A]"
          />
        </div>
      </div>
    </div>
  );
}
