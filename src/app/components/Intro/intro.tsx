import introImg from "../../../resources/img/intro.svg";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import { BaseContent } from "../BaseContent";
import { SectionCopy } from "../SectionCopy/SectionCopy";

export function Intro() {
  return (
    <section
      id="hero"
      className="h-[594px] tablet:h-[720px]"
      style={{
        background: "linear-gradient(107.56deg, #1C1D26 0%, #161619 100%)",
      }}
    >
      <BaseContent>
        <div
          className={`
          grid grid-cols-1 mx-[16px]
          tablet:mx-[72px]
          tablet2:mx-[48px] tablet2:lg:grid-cols-2
          laptop:mx-[72px]
          2xl:mx-auto
        `}
        >
          {/* left col */}
          <div
            className={`
            grid grid-cols-1
            mt-[40px]
            tablet:mt-[72px]
            tablet2:my-auto
        `}
          >
            <SectionTitle as="h1" title={"What we do?\nHire Intelligence."} />
            <SectionCopy>
              {
                "Hiring is a human experience, and Syelo\nis the Human Resistance."
              }
            </SectionCopy>
          </div>

          {/* right col */}
          <div className="grid grid-cols-1">
            <div className="grid place-items-center my-8 xl:min-w-max">
              <img
                // TODO: Need better types on svg imports
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                src={introImg}
                alt="Logo"
                className={`max-w-none w-[315px] -ml-[15px] scale-150
              tablet:w-[391px] tablet:scale-125
              tablet2:w-[538px] tablet2:scale-150
              laptop:w-[625px]
            `}
              />
            </div>
          </div>
        </div>
      </BaseContent>
    </section>
  );
}
