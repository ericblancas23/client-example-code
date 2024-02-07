import { Card } from "./Card";
import logo from "../../../resources/img/logo_horizontal.svg";
import styles from "./MainPanel.module.css";
import { GradientText } from "../GradientText";

export function MainPanel() {
  return (
    <div
      className={`
      z-0 relative
      rounded-3xl p-[2px] bg-gradient-to-r from-[#7FA3E8] to-[#A2F2E3] max-w-[618px] justify-self-end
      -mt-[4.25rem] tablet:-mt-[7rem] tablet2:mt-0
    `}
    >
      <div className={`bg-[#2c2e3e] rounded-[24px]`}>
        <div
          className={`bg-[#2c2e3e] rounded-t-[24px] opacity-90 ${styles.header}`}
        >
          <div className="p-[23.5px]">
            <div className="flex">
              <img
                className="w-[67px] mb-[5.25px] tablet:w-[134px]"
                // TODO: Need better types on svg imports
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                src={logo}
                alt="logo"
              />
            </div>
            <GradientText
              className={`inter800 text-[20px]/[20px] -tracking-[0.05rem] mb-[4px]
              tablet:text-[32px]/[32px]
              `}
            >
              Hire Intelligence.
            </GradientText>
            <div
              className={`inter500 text-[12px]/[12px] -tracking-[0.02rem]
                tablet:text-[16px]/[16px]
              `}
            >
              Highly vetted candidates right in your inbox.
            </div>
          </div>
        </div>
        <div className="bg-[#2c2e3ebf] flex flex-col gap-4 px-3.5 py-4 rounded-b-3xl relative z-10">
          <Card
            name="Cindy Reiner"
            role="Data Scientist"
            interviewer="Jeff Winchel"
            experience="Associate"
            basedIn="Seattle, WA, USA"
          />
          <Card
            name="Ian Walker"
            role="Product Designer"
            interviewer="Audrey Salazar"
            experience="Mid-Senior"
            basedIn="Miami, FL, USA"
          />
          <Card
            name="Jane Smith"
            role="Executive Director"
            interviewer="Audrey Salazar"
            experience="Director"
            basedIn="Miami, FL, USA"
          />
        </div>
      </div>
    </div>
  );
}
