import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { UseQueryResult } from "react-query";

import { TableRow } from "./TableRow";
import { Button } from "../Button/Button";
import { ButtonStyle } from "../Button/types";
import type { Introduction, IntroductionsResponse } from "@syelo/api";
import type { HeaderDeclaration } from "../../../pages/dashboard";
import TableHeaderRow from "./TableHeaderRow";
import TableRowError from "./TableRowError";
import TableRowEmpty from "./TableRowEmpty";
import TableRowLoading from "./TableRowLoading";

interface IntroductionListProps {
  headers: HeaderDeclaration[];
  query: UseQueryResult<IntroductionsResponse>;
  resources: Introduction[];
  onActionClickSuccess: () => Promise<void>;
  emptyMessage: string;
}

export default function IntroductionList({
  resources,
  query,
  headers,
  emptyMessage,
}: IntroductionListProps) {
  const refetch = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    void query.refetch();
  };

  return (
    <table className="w-full border-separate border-spacing-y-2">
      <thead>
        <TableHeaderRow headers={headers} />
      </thead>
      <tbody>
        {query.isError && (
          <TableRowError
            colSpan={headers.length}
            message="Something went wrong trying to load Introductions."
          >
            <Button
              className="ml-4"
              style={ButtonStyle.SECONDARY}
              onClick={refetch}
            >
              Try again
            </Button>
          </TableRowError>
        )}
        {query.isSuccess && resources.length === 0 && (
          <TableRowEmpty colSpan={headers.length} message={emptyMessage} />
        )}
        {query.isLoading && (
          <TableRowLoading colSpan={headers.length} message={"Loading"} />
        )}
        {!query.isError &&
          !query.isLoading &&
          resources.map(({ id, candidate, job }) => (
            <TableRow
              headers={headers}
              key={id}
              candidate={candidate}
              recruiter={candidate.createdBy}
              roles={job.roles}
            >
              <div className="border-[#C3C5CA] border cursor-pointer flex h-7 items-center justify-center rounded-full w-7">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
            </TableRow>
          ))}
      </tbody>
    </table>
  );
}
