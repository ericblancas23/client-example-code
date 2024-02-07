import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export function LogInFooter() {
  return (
    <>
      Already have an account?
      <FontAwesomeIcon
        className="ml-1 mr-2"
        color="#64656F"
        icon={faChevronRight}
        size="xs"
      />
      <Link to="/sign-in">
        <span
          className={`cursor-pointer text-[#1041ED] text-xs uppercase inter600`}
        >
          Log in
        </span>
      </Link>
    </>
  );
}
