import type { HeaderDeclaration } from "../../../pages/dashboard";
import type { ReactNode } from "react";
import { TableData } from "./TableData";
import type { Candidate, Company, Role, Skill, UserRef } from "@syelo/api";
import type { Location } from "@syelo/api";

interface TableRowProps {
  headers: HeaderDeclaration[];
  fullName?: string;
  linkedIn?: string;
  email?: string;
  locations?: Location[];
  roles?: Role[];
  skills?: Skill[];
  jobType?: string;
  seniority?: string;
  compRange?: [number, number] | [];
  submissionDate?: string;
  company?: Company;
  candidate?: Candidate;
  recruiter?: UserRef;
  introductionDate?: string;
  children: ReactNode;
}

export function TableRow({
  headers,
  recruiter,
  candidate,
  children,
  ...rest
}: TableRowProps) {
  return (
    <tr className="rounded-xl w-full text-[#525766] bg-white whitespace-nowrap">
      {headers.map((header, index) => {
        switch (header.key) {
          case "recruiter":
            // displays like a "name" cell
            return (
              <TableData
                key={header.key}
                header={{
                  key: "name",
                  colSpan: header.colSpan,
                  label: header.label,
                }}
                index={index}
                fullName={recruiter?.fullName}
                linkedIn={recruiter?.linkedInUrl}
                email={recruiter?.email}
              >
                {children}
              </TableData>
            );
          case "candidate":
            // displays like a "name" cell
            return (
              <TableData
                key={header.key}
                header={{
                  key: "name",
                  colSpan: header.colSpan,
                  label: header.label,
                }}
                index={index}
                fullName={candidate?.fullName}
                linkedIn={candidate?.linkedInUrl}
                email={candidate?.email}
              >
                {children}
              </TableData>
            );
          default:
            return (
              <TableData
                key={header.key}
                header={header}
                index={index}
                {...rest}
              >
                {children}
              </TableData>
            );
        }
      })}
    </tr>
  );
}
