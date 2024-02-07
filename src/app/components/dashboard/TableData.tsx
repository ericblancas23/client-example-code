import type { HeaderDeclaration } from "../../../pages/dashboard";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import type { Company, Location, Role, Skill } from "@syelo/api";

interface TableDataProps {
  header: HeaderDeclaration;
  index: number;
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
  introductionDate?: string;
  children: ReactNode;
}

const IntlDateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

// eslint-disable-next-line sonarjs/cognitive-complexity
export function TableData({
  header,
  index,
  fullName,
  linkedIn,
  email,
  locations,
  roles,
  skills,
  jobType,
  seniority,
  compRange,
  submissionDate,
  company,
  introductionDate,
  children,
}: TableDataProps) {
  const extraRolesCount = roles && roles.length > 0 && roles.length - 1;
  const extraSkillsCount = skills && skills.length > 0 && skills.length - 1;
  const colSpanFor = (header: HeaderDeclaration): string =>
    "col-span-" + (header.colSpan || 1);

  switch (header.key) {
    case "name":
      return (
        <td
          className={`${
            index === 0 ? "pl-4 p-4 rounded-l-xl " : "pl-2 p-2 "
          } ${colSpanFor(header)}`}
        >
          <div className="flex items-center">
            {linkedIn && (
              <Link
                to={linkedIn}
                className="border-[#C3C5CA] border rounded-full px-3 py-2"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </Link>
            )}

            <div className="flex flex-col ml-2">
              <span className={`inter500 leading-[0.875rem]`}>{fullName}</span>
              {email && (
                <span className={`inter400 leading-3 mt-0.5 text-[0.6875rem]`}>
                  {email}
                </span>
              )}
            </div>
          </div>
        </td>
      );
    case "locations":
      return (
        <td className={`p-2 ${colSpanFor(header)}`}>
          {locations &&
            locations.map((location: Location) => location.name).join(", ")}
        </td>
      );
    case "roles":
      return (
        <td className={`p-2 ${colSpanFor(header)}`}>
          {roles && roles[0]?.name}
          {extraRolesCount ? (
            <span
              className={`ml-2 py-2 px-3 bg-[#EAEAEC] rounded-3xl text-[#313438]`}
            >
              + {extraRolesCount}
            </span>
          ) : null}
        </td>
      );
    case "skills":
      return (
        <td className={`p-2 ${colSpanFor(header)}`}>
          {skills && skills[0]?.name}
          {extraSkillsCount ? (
            <span
              className={`ml-2 py-2 px-3 bg-[#EAEAEC] rounded-3xl text-[#313438]`}
            >
              + {extraSkillsCount}
            </span>
          ) : null}
        </td>
      );
    case "jobType":
      return (
        <td className={`p-2 text-left ${colSpanFor(header)}`}>{jobType}</td>
      );
    case "seniority":
      return (
        <td className={`p-2 text-left ${colSpanFor(header)}`}>{seniority}</td>
      );
    case "compRange":
      return (
        <td className={`p-2 text-left col-span-${colSpanFor(header)}`}>
          {compRange?.length === 2 && compRange[0] !== 0 && compRange[1] !== 0
            ? `${compRange[0] / 1000}K - ${compRange[1] / 1000}K`
            : ""}
        </td>
      );
    case "submissionDate":
      return (
        <td className={`p-2 text-left uppercase ${colSpanFor(header)}`}>
          {submissionDate && IntlDateFormat.format(new Date(submissionDate))}
        </td>
      );
    case "company":
      return (
        <td
          className={`text-[#1041ED] ${
            index === 0 ? " p-4 rounded-l-xl " : " p-2 "
          } ${colSpanFor(header)}`}
        >
          {company?.identifiers[0] ? (
            <Link
              to={company.identifiers[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {company.identifiers[0].name}
            </Link>
          ) : (
            ""
          )}
        </td>
      );
    case "introductionDate":
      return (
        <td
          className={`pl-2 pr-4 rounded-r-xl text-left uppercase ${colSpanFor(
            header
          )}`}
        >
          {introductionDate &&
            IntlDateFormat.format(new Date(introductionDate))}
        </td>
      );
    case "actions":
      return <td className="p-2 pr-2.5 rounded-r-xl">{children}</td>;
  }
}
