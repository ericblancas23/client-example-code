import type { UseQueryResult } from "react-query";

import { TableRow } from "./TableRow";
import { Button } from "../Button/Button";
import { ButtonStyle } from "../Button/types";
import type { Candidate, CandidatesResponse } from "@syelo/api";
import type { HeaderDeclaration } from "../../../pages/dashboard";
import TableHeaderRow from "./TableHeaderRow";
import TableRowError from "./TableRowError";
import TableRowEmpty from "./TableRowEmpty";
import TableRowLoading from "./TableRowLoading";
import { CandidateActions } from "./CandidateActions.tsx";

interface CandidateListProps {
  headers: HeaderDeclaration[];
  query: UseQueryResult<CandidatesResponse>;
  resources: Candidate[];
  onActionClickSuccess: () => Promise<void>;
  emptyMessage: string;
}

export default function CandidateList({
  resources,
  query,
  headers,
  emptyMessage,
}: CandidateListProps) {
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
            message="Something went wrong trying to load candidates."
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
          resources.map(
            ({
              compensationMax,
              compensationMin,
              createdAt,
              fullName,
              id,
              jobType,
              locations,
              resumeId,
              roles,
              skills,
              seniorityLevel,
              email,
              notes,
              linkedInUrl,
            }) => (
              <TableRow
                headers={headers}
                compRange={
                  typeof compensationMax === "number" &&
                  typeof compensationMin === "number"
                    ? [compensationMin, compensationMax]
                    : []
                }
                email={email}
                fullName={fullName}
                jobType={jobType}
                key={id}
                linkedIn={linkedInUrl}
                locations={locations}
                roles={roles}
                skills={skills}
                seniority={seniorityLevel}
                submissionDate={new Date(createdAt).toLocaleDateString()}
              >
                <CandidateActions
                  id={id}
                  modalTitle={`Recommendations - ${fullName}`}
                  notes={notes}
                  resumeId={resumeId}
                  afterClick={() => void query.refetch()}
                />
              </TableRow>
            )
          )}
      </tbody>
    </table>
  );
}
