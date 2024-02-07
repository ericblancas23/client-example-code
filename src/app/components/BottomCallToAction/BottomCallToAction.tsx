import { Link } from "react-router-dom";
import { BaseContent } from "../../components/BaseContent";
import { GradientText } from "../GradientText";
import LinesPatternMobile from "/LinesPatternMobile.svg";
import LinesPatternDesktop from "/LinesPatternDesktop.svg";
import LinesPatternTablet from "/LinesPatternTablet.svg";

export function BottomCallToAction() {
  const url: string = import.meta.env.VITE_WEBAPP_SIGN_UP_URL;

  return (
    <div className="w-full relative bg-gradient-to-r from-[#1041ED] to-[#0C2C9E]">
      <img
        alt=""
        src={LinesPatternMobile}
        className="absolute right-0 bottom-0 h-[216px] tablet:hidden z-10"
      />
      <img
        alt=""
        src={LinesPatternTablet}
        className="hidden tablet:block tablet2:hidden absolute right-0 z-10"
      />
      <img
        alt=""
        src={LinesPatternDesktop}
        className="hidden tablet2:block absolute right-0 max-w-none z-10"
      />

      <BaseContent
        className={`py-[32px] pl-[16px]
          tablet:h-[344px] tablet:pt-[72px] tablet:pl-[72px]
          tablet2:h-[244px] tablet2:px-[48px] tablet2:pt-0 tablet2:flex tablet2:justify-between tablet2:items-center
          laptop:px-[72px]
          2xl:px-0
        `}
      >
        <div className="mb-[24px] w-[259px] tablet:w-[392px] tablet2:mb-0">
          <GradientText
            className={`inter700 text-[32px]/[40px] -tracking-[0.05rem]
              tablet:text-[56px]/[72px] tablet:-tracking-[0.05rem]
            `}
          >
            Interested?
          </GradientText>
          <div
            className={`inter500 text-[#F4F4F4] text-[20px]/[28px] -tracking-[0.02rem]`}
          >
            Join the resistance, become a member.
          </div>
        </div>

        <div className="relative z-20">
          <Link to={url}>
            <button
              className={`inter700 bg-white text-blue rounded-full uppercase px-[32px] py-[8px] tracking-[0.06em]`}
            >
              Apply Now
            </button>
          </Link>
        </div>
      </BaseContent>
    </div>
  );
}
