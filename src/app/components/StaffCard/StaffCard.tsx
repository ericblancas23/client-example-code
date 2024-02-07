import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

import styles from "./StaffCard.module.css";

interface StaffCardProps {
  name: string;
  position: string;
  image: string;
  linkedInUrl: string;
}

const BACKGROUND = "linear-gradient(141.97deg, #21DAA3 11.06%, #1041ED 95.04%)";

export function StaffCard({
  name,
  position,
  image,
  linkedInUrl,
}: StaffCardProps) {
  return (
    <div
      className={`
        rounded-[2em]
        bg-[#33364C]
        mb-4
        ${styles.card}
      `}
      style={{
        backdropFilter: "blur(2px)",
      }}
    >
      <div>
        <div className="relative h-full">
          <div
            className="absolute rounded-full w-[164px] h-[164px] top-[13px] left-[77px]"
            style={{
              background: BACKGROUND,
              opacity: "0.2",
              filter: "blur(30px)",
            }}
          />

          <img
            src="/photocardpatternmobile.svg"
            alt="patterns"
            height={300}
            width={300}
            className="md:hidden"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />

          <img
            src="/photocardpatterntablet.svg"
            alt="patterns"
            height={300}
            width={300}
            className="hidden md:block lg:hidden"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />

          <img
            src="/photocardpatterndesktop.svg"
            alt="patterns"
            height={300}
            width={300}
            className="hidden lg:block"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        <div className="h-full w-full flex flex-col items-center px-4 py-8">
          <img
            src={image}
            alt={name}
            width={168}
            height={168}
            style={{
              background: BACKGROUND,
              borderRadius: "50%",
              borderStyle: "solid",
              borderWidth: "4px",
            }}
            className="md:hidden"
          />
          <img
            src={image}
            alt={name}
            width={222}
            height={222}
            style={{
              background: BACKGROUND,
              borderRadius: "50%",
              borderStyle: "solid",
              borderWidth: "4px",
            }}
            className="hidden md:block lg:hidden"
          />

          <img
            src={image}
            alt={name}
            width={300}
            height={300}
            style={{
              background: BACKGROUND,
              borderRadius: "50%",
              borderStyle: "solid",
              borderWidth: "4px",
            }}
            className="hidden lg:block"
          />

          <div>
            <p
              className={`
                mt-6
                lg:mt-[48px]
                text-center
                leading-8
                text-[1.75rem]
                tracking-[-0.05em]
                text-[transparent]
                bg-gradient-to-r
                from-[#A2F2E3]
                to-[#7FA3E8]
                bg-clip-text
                inter700`}
            >
              {name}
            </p>
          </div>

          <p
            className={`text-[#EAEAEC] text-xl leading-[1.875rem] tracking-[-0.02em] mb-6 lg:mb-[30px] text-center inter700`}
          >
            {position}
          </p>

          <a
            href={linkedInUrl}
            title={`Go to ${name}'s LinkedIn profile`}
            type="button"
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={`bg-[#1041ED] text-white flex items-center justify-center
              w-[110px] h-[64px] py-[8px] px-[16px] rounded-[110px]
            `}
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
