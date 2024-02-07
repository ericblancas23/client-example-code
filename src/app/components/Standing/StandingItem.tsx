import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface StandingItemProps {
  name: string;
  linkedInUrl: string;
  intros: number;
}

export function StandingItem({ name, linkedInUrl, intros }: StandingItemProps) {
  return (
    <div
      className={`flex p-1 rounded-3xl sm:p-2.5 sm:rounded-[3.5rem]
       w-full justify-between bg-[#2C2E3EBF] items-center`}
    >
      <div className="flex items-center">
        <a
          href={linkedInUrl}
          title={`Go to ${name}'s LinkedIn profile`}
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={`bg-[#1041ED]w-10 h-10 px-2 py-1 sm:w-[3.625rem] sm:h-[3.625rem] sm:px-[0.9375rem] sm:py-[0.8125rem] 
            rounded-full flex items-center justify-center text-white`}
          >
            <FontAwesomeIcon className="sm:hidden" icon={faLinkedin} />
            <FontAwesomeIcon
              className="hidden sm:block"
              icon={faLinkedin}
              size="2x"
            />
          </div>
        </a>

        <span
          className={`leading-8 pl-4 text-base sm:text-2xl text-[transparent]
           bg-gradient-to-r from-[#A2F2E3] to-[#7FA3E8] bg-clip-text inter700`}
        >
          {name}
        </span>
      </div>

      <div
        className={`bg-[#D8ECF736] py-1 px-2 mr-1
         sm:py-[0.6875rem] sm:px-4 sm:mr-1.5 rounded-3xl`}
        style={{
          background:
            "radial-gradient(5.21% 41.15% at 50% 50%, rgba(237, 243, 241, 0.21) 0%, rgba(216, 236, 247, 0.21) 100%)",
        }}
      >
        <p
          className={`leading-6 text-xs sm:leading-6 sm:text-xl
           text-white inter600`}
        >
          {intros} intros
        </p>
      </div>
    </div>
  );
}
