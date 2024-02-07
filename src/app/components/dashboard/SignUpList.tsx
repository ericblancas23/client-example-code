import { TableRow } from "./TableRow";
import type { User, UsersResponse } from "@syelo/api";
import { approveUser, denyUser } from "@syelo/client-api/src/users/api";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import type { UseQueryResult } from "react-query";
import type { HeaderDeclaration } from "../../../pages/dashboard";
import { TableDataActionButton } from "./TableDataActionButton";
import TableHeaderRow from "./TableHeaderRow";
import TableRowLoading from "./TableRowLoading";
import TableRowEmpty from "./TableRowEmpty.tsx";

interface SignUpListProps {
  emptyMessage: string;
  headers: HeaderDeclaration[];
  query: UseQueryResult<UsersResponse>;
  resources: User[];
  onActionClickSuccess: () => Promise<void>;
}

export function SignUpList({
  headers,
  onActionClickSuccess,
  resources,
  query,
  emptyMessage,
}: SignUpListProps) {
  const { authToken } = useCurrentUser();

  const onClickApproveUser = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const controller = new AbortController();
    const target: HTMLElement = e.target as HTMLElement;
    const id: string = String(
      target?.closest("button")?.getAttribute("data-resource-id")
    );

    const query = approveUser(id, {
      signal: controller.signal,
      token: authToken,
    });
    query.then(onActionClickSuccess).catch((error) => {
      if (controller.signal.aborted) {
        return;
      }

      console.error(error);
    });
  };
  const onClickDenyUser = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const controller = new AbortController();
    const target: HTMLElement = e.target as HTMLElement;
    const id: string = String(
      target?.closest("button")?.getAttribute("data-resource-id")
    );

    const query = denyUser(id, {
      signal: controller.signal,
      token: authToken,
    });
    query.then(onActionClickSuccess).catch((error) => {
      if (controller.signal.aborted) {
        return;
      }

      console.error(error);
    });
  };

  return (
    <table className="w-full border-separate border-spacing-y-2">
      <thead>
        <TableHeaderRow headers={headers} />
      </thead>
      <tbody>
        {query.isSuccess && resources.length === 0 && (
          <TableRowEmpty colSpan={headers.length} message={emptyMessage} />
        )}
        {query.isLoading && (
          <TableRowLoading colSpan={headers.length} message={"Loading"} />
        )}
        {query.isSuccess &&
          resources.map((user: User) => {
            return (
              <TableRow
                key={user.id}
                headers={headers}
                fullName={user.fullName}
                email={user.email}
                linkedIn={user.linkedInUrl}
                company={user.company}
              >
                <div className={`flex flex-row gap-3 justify-end`}>
                  <TableDataActionButton
                    label="Approve"
                    onClick={onClickApproveUser}
                    resourceId={user.id}
                  />
                  <TableDataActionButton
                    label="Deny"
                    onClick={onClickDenyUser}
                    resourceId={user.id}
                  />
                </div>
              </TableRow>
            );
          })}
      </tbody>
    </table>
  );
}
