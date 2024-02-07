import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faIdBadge,
  faLocationPin,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CardProps {
  /** Where candidate is based out of. */
  basedIn: string;

  /** Candidate's experience level. */
  experience: string;

  /** Name of person who interviewed candidate. */
  interviewer: string;

  /** Candidate's name. */
  name: string;

  /** Candidate's role. */
  role: string;
}

export function Card({
  basedIn,
  experience,
  interviewer,
  name,
  role,
}: CardProps) {
  return (
    <div className="rounded-[13px] p-[13.32px] tablet:p-[24px] bg-[#1f1f28bf] flex flex-col">
      <div className="flex">
        <div className="flex-1 flex flex-col">
          <div
            className={`inter800 mb-1 text-[#6E8BF5] text-[16px]/[18px] -tracking-[0.02rem] [word-spacing:9999px]
            tablet:text-[28px]/[32px]
            `}
          >
            {name}
          </div>
          <p
            className={`inter500 text-[#F4F4F4] uppercase grid items-center
            grid-cols-[8px_1fr] gap-[4.4px] text-[8px]/[8px]
            tablet:grid-cols-[16px_1fr] tablet:gap-[8px] tablet:text-[12px]/[14px] tablet:tracking-[0.10rem]
              `}
          >
            <FontAwesomeIcon
              icon={faStar}
              color="#08E2AE"
              className="justify-self-center"
            />
            <span>{experience}</span>
            <FontAwesomeIcon
              icon={faLocationPin}
              color="#08E2AE"
              className="justify-self-center"
            />
            <span>{basedIn}</span>
          </p>
        </div>

        <div className="flex-1 flex flex-col items-end">
          <p
            className={`inter500 text-[#6E8BF5] text-[12px]/[12px] -tracking-[0.02rem] mb-[1rem]
            tablet:text-[20px]/[20px]
            `}
          >
            {role}
          </p>
          <p
            className={`inter500 text-[#F4F4F4] uppercase text-[8px]/[8px] mb-[4px]
            tablet:text-[12px]/[14px] tracking-[0.10rem]
            `}
          >
            Submitted by
          </p>
          <p
            className={`inter500 text-[#6E8BF5] text-[12px]/[12px] -tracking-[0.02rem]
            tablet:text-[16px]/[24px]
            `}
          >
            {interviewer}
          </p>
        </div>
      </div>
      <hr className=" mb-3 border-[#C3C5CA1a] border-[1px] mt-[45px] " />

      <div className="flex justify-between items-start text-white p-[13.32px] tablet:p-0 tablet:py-[12px]">
        <div className="flex gap-[4.4px] tablet:gap-[8px]">
          <button
            className={`bg-[#30313F] flex items-center justify-center rounded-[22px] w-[49.95px] h-[22.2px]
            tablet:rounded-[39px] tablet:w-[90px] tablet:h-[40px]
          `}
          >
            <FontAwesomeIcon
              icon={faIdBadge}
              className="text-xs tablet:text-xl"
            />
          </button>
          <button
            className={`bg-[#30313F] flex items-center justify-center rounded-[22px] w-[49.95px] h-[22.2px]
            tablet:rounded-[39px] tablet:w-[90px] tablet:h-[40px]
            `}
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-xs tablet:text-xl"
            />
          </button>
        </div>
        <button
          className={`inter600 bg-blue rounded-[33px] text-[8px]/[8px] tracking-[0.11rem] uppercase px-[13px] py-[9px]
          tablet:rounded-[59px] tablet:text-[14px]/[16px] tablet:px-[24px] tablet:py-[12px]
        `}
        >
          Schedule Interview
        </button>
      </div>
    </div>
  );
}
