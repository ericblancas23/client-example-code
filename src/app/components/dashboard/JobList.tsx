import type { UseQueryResult } from "react-query";

import { TableRow } from "./TableRow";
import { Button } from "../Button/Button";
import { ButtonStyle } from "../Button/types";
import type { Job, JobsResponse } from "@syelo/api";
import type { HeaderDeclaration } from "../../../pages/dashboard";
import TableHeaderRow from "./TableHeaderRow";
import TableRowError from "./TableRowError";
import TableRowEmpty from "./TableRowEmpty";
import TableRowLoading from "./TableRowLoading";
import { JobActions } from "./JobActions";

interface JobListProps {
  headers: HeaderDeclaration[];
  query: UseQueryResult<JobsResponse>;
  resources: Job[];
  onActionClickSuccess: () => Promise<void>;
  emptyMessage: string;
}

export default function JobList({
  resources,
  query,
  headers,
  emptyMessage,
}: JobListProps) {
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
            message="Something went wrong trying to load jobs."
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
              company,
              id,
              jobType,
              locations,
              notes,
              roles,
              skills,
              seniorityLevel,
            }) => (
              <TableRow
                headers={headers}
                compRange={
                  typeof compensationMax === "number" &&
                  typeof compensationMin === "number"
                    ? [compensationMin, compensationMax]
                    : []
                }
                company={company}
                jobType={jobType}
                key={id}
                locations={locations}
                roles={roles}
                skills={skills}
                seniority={seniorityLevel}
                submissionDate={new Date(createdAt).toLocaleDateString()}
              >
                <JobActions
                  id={id}
                  modalTitle="Notes"
                  notes={notes}
                  afterClick={() => void query.refetch()}
                />
              </TableRow>
            )
          )}
      </tbody>
    </table>
  );
}
