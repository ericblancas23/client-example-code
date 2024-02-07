import howItWorks from "../../../resources/img/how_it_works.svg";
import howItWorksLg from "../../../resources/img/how_it_works_lg.svg";
import { GetAccess } from "./GetAccess";
import { MainPanel } from "./MainPanel";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import { BaseContent } from "../BaseContent";
import { SectionCopy } from "../SectionCopy/SectionCopy";

export function HowItWorks() {
  return (
    <section
      id="howitworks"
      className={`bg-gradient-to-t from-[#1C1D26] to-[#161619]
      pb-4 px-[16px] tablet:px-[72px] tablet2:px-[48px] laptop:px-[72px] 2xl-px-0]
    `}
      style={{
        background: "linear-gradient(107.56deg, #1C1D26 0%, #161619 100%)",
      }}
    >
      <BaseContent className={`relative`}>
        <div
          className={`relative py-[114px]
            tablet2:grid tablet2:grid-cols-[400px_1fr] tablet2:gap-x-[94px] tablet2:gap-y-[3rem]
            `}
        >
          <div className={`relative`}>
            <SectionTitle as="h1" title="How it works?" />
            <SectionCopy>
              Syelo is an invite-only community of hiring managers and talent
              advocates who are revolutionizing the recruiting industry.
              {"\n\n"}
              Everyday recruiters interview amazing candidates who ultimately
              are not the best fit for their company or role. In the past these
              relationships never went any further and a relationship was lost.
              Syelo is changing that. We bring together a network of in-house
              recruiting professionals who become master connectors to elite
              talent.
              {"\n\n"}
              Our recruiters freely upload a job-seeker&apos;s resume, location,
              skillset, and bio to Syelo - if a candidate matches the criteria
              of a role that another member is hiring for, we automatically
              connect the two parties through email for free.
            </SectionCopy>

            <img
              className={`hidden absolute max-w-none z-10
                tablet2:block
                w-[452px] mt-[80px] ml-[54px] scale-[1.375]
                laptop:w-[591px] laptop:mt-0 laptop:-ml-[22px] laptop:scale-[1.125]
                2xl:scale-[1.50] 2xl:mt-[25px] 2xl:ml-[63px]
            `}
              // TODO: Need better types on svg imports
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              src={howItWorksLg}
              alt="Email Network"
            />
          </div>

          <img
            className="tablet2:hidden w-[328px] tablet:w-[551px] mt-[8px] relative z-10 mx-auto"
            // TODO: Need better types on svg imports
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={howItWorks}
            alt="Email Network"
          />

          <MainPanel />
          <GetAccess />
        </div>
      </BaseContent>
    </section>
  );
}
