import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import CardPage from "../../app/components/CardPage/CardPage";

export default function Upload() {
  return (
    <CardPage title="What do you want to do?">
      <Link className="w-full" to="/portal/candidates/new">
        <div className="mb-3 flex justify-between rounded-[3.875em] border-[1px] border-[#C3C5CA] w-full py-3 px-4 cursor-pointer">
          <span className={`text-[#525766] text-sm inter400`}>
            Upload a Candidate
          </span>
          <FontAwesomeIcon icon={faChevronRight} color="#525766" />
        </div>
      </Link>

      <Link className="w-full" to="/portal/jobs/new">
        <div className="flex justify-between rounded-[3.875em] border-[1px] border-[#C3C5CA] w-full py-3 px-4 cursor-pointer">
          <span className={`text-[#525766] text-sm inter400 `}>Upload Job</span>
          <FontAwesomeIcon icon={faChevronRight} color="#525766" />
        </div>
      </Link>
    </CardPage>
  );
}
