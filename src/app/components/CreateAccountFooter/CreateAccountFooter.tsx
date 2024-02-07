import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function CreateAccountFooter() {
  return (
    <>
      Don&apos;t have an account?
      <FontAwesomeIcon
        className="ml-1 mr-2"
        color="#64656F"
        icon={faChevronRight}
        size="xs"
      />
      <Link to="/sign-up">
        <span
          className={`inter600 cursor-pointer text-[#1041ED] text-xs uppercase`}
        >
          Create an account
        </span>
      </Link>
    </>
  );
}
