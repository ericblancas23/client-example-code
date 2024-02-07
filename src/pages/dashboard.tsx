import { faDownload } from "@fortawesome/free-solid-svg-icons";
import type {
  Candidate,
  CandidatesResponse,
  Introduction,
  IntroductionsResponse,
  Job,
  JobsResponse,
  LocationsResponse,
  RolesResponse,
  User,
  UsersResponse,
} from "@syelo/api";
import {
  getCandidates,
  getJobs,
  getMyJobs,
  getSignUps,
  getLocations,
  getRoles,
} from "@syelo/client-api";
import type { Filter } from "@syelo/client-api/dist/types";
import axios from "axios";
import fileDownload from "js-file-download";
import { type ReactNode, useState } from "react";
import { useQuery, type UseQueryResult } from "react-query";

import { AnchorButton } from "../app/components/Button/AnchorButton";
import { NavPage } from "../app/components/NavPage/NavPage";
import CandidateList from "../app/components/dashboard/CandidateList";
import JobList from "../app/components/dashboard/JobList";
import MenuItem from "../app/components/dashboard/MenuItem";
import Search from "../app/components/dashboard/Search";
import SidebarFilter from "../app/components/dashboard/SidebarFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head } from "../app/components/Head/Head";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { SignUpList } from "../app/components/dashboard/SignUpList";
import { ProfileButton } from "../app/components/Button/ProfileButton";
import { getIntroductions } from "@syelo/client-api/dist/introductions/api";
import IntroductionList from "../app/components/dashboard/IntroductionList";
import type { SkillsResponse } from "@syelo/api";
import { getSkills } from "@syelo/client-api/dist/skills";

export interface HeaderDeclaration {
  key: string;
  label: string | ReactNode;
  colSpan?: number;
}

export default function Dashboard() {
  const { authToken, isAdmin, currentUser } = useCurrentUser();
  const [filters, setFilters] = useState({} as Filter);
  const [searchValue, setSearchValue] = useState("");
  const [tabSelected, setTabSelected] = useState<string>("CandidateList");

  const locationsQuery: UseQueryResult<LocationsResponse> = useQuery(
    "locations",
    ({ signal }): Promise<LocationsResponse> =>
      getLocations({
        signal: signal,
        token: authToken,
      })
  );

  const rolesQuery: UseQueryResult<RolesResponse> = useQuery(
    "roles",
    ({ signal }): Promise<RolesResponse> =>
      getRoles({
        signal: signal,
        token: authToken,
      })
  );

  const skillsQuery: UseQueryResult<SkillsResponse> = useQuery(
    "skills",
    ({ signal }): Promise<SkillsResponse> =>
      getSkills({
        signal: signal,
        token: authToken,
      })
  );

  let jobsQuery: UseQueryResult<JobsResponse> | undefined;
  let signUpsQuery: UseQueryResult<UsersResponse> | undefined;

  if (isAdmin()) {
    signUpsQuery = useQuery(
      "signUps",
      ({ signal }): Promise<UsersResponse> =>
        getSignUps({ signal: signal, token: authToken })
    );

    jobsQuery = useQuery(
      "jobs",
      ({ signal }): Promise<JobsResponse> =>
        getJobs({
          signal: signal,
          token: authToken,
        })
    );
  }

  const jobsResources: Job[] = jobsQuery?.data?.data || [];

  const signUpsResources: User[] = signUpsQuery?.data?.data || [];

  const introductionsQuery: UseQueryResult<IntroductionsResponse> = useQuery(
    "introductions",
    ({ signal }): Promise<IntroductionsResponse> =>
      getIntroductions({
        signal: signal,
        token: authToken,
      })
  );

  const introductionsResources: Introduction[] =
    introductionsQuery?.data?.data || [];

  const candidatesQuery: UseQueryResult<CandidatesResponse> = useQuery(
    ["candidates", filters],
    ({ signal }): Promise<CandidatesResponse> => {
      return getCandidates({
        signal: signal,
        token: authToken,
        filters: filters,
      });
    }
  );

  const candidatesResources: Candidate[] = candidatesQuery.data?.data || [];

  const myCandidatesQuery: UseQueryResult<CandidatesResponse> = useQuery(
    ["myCandidates", filters],
    ({ signal }): Promise<CandidatesResponse> => {
      return getCandidates({
        signal: signal,
        token: authToken,
        filters: { ...filters, createdById: currentUser.id },
      });
    }
  );

  const myCandidatesResources: Candidate[] = myCandidatesQuery.data?.data || [];

  const myJobsQuery: UseQueryResult<JobsResponse> = useQuery(
    "myJobs",
    ({ signal }): Promise<JobsResponse> =>
      getMyJobs(currentUser.id, {
        signal: signal,
        token: authToken,
      })
  );

  const myJobsResources: Job[] = myJobsQuery.data?.data || [];

  const reloadQuery = async (query: UseQueryResult) => {
    await query.refetch();
  };

  const onSubmitFilters = (selectedFilters: Filter) => {
    setFilters(selectedFilters);
  };

  const downloadCsv = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const extraFilters =
      tabSelected === "MyCandidateList" ? { createdById: currentUser.id } : {};
    const baseUrl = String(import.meta.env.VITE_SERVER_BASE_URL);
    axios
      .get(`${baseUrl}/v1/candidates.csv`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: { ...filters, ...extraFilters },
        responseType: "blob",
      })
      .then((resp) => {
        const disp: string =
          (resp.headers["content-disposition"] as string | undefined) || "";
        const filename = disp
          .replace('attachment; filename="', "")
          .replace('"', "");
        fileDownload(resp.data as Blob, filename);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const renderContent = () => {
    switch (tabSelected) {
      case "IntroductionList":
        return introductionsQuery ? (
          <IntroductionList
            headers={[
              {
                key: "recruiter",
                label: "Recruiter",
              },
              {
                key: "roles",
                label: "Role",
              },
              {
                key: "candidate",
                label: "Candidate",
              },
              {
                key: "actions",
                label: "Track Email",
              },
            ]}
            query={introductionsQuery}
            resources={introductionsResources}
            onActionClickSuccess={() => reloadQuery(introductionsQuery)}
            emptyMessage="There are no Introductions right now."
          />
        ) : (
          <></>
        );
      case "SignUpList":
        return signUpsQuery ? (
          <SignUpList
            headers={[
              {
                key: "name",
                label: "Name",
              },
              {
                key: "company",
                label: "Company",
              },
              {
                key: "actions",
                label: "",
              },
            ]}
            query={signUpsQuery}
            resources={signUpsResources}
            onActionClickSuccess={() =>
              reloadQuery(signUpsQuery as UseQueryResult<UsersResponse>)
            }
            emptyMessage="There are no Sign Ups right now."
          />
        ) : (
          <></>
        );
      case "MyJobList":
        return (
          <JobList
            headers={[
              {
                key: "company",
                label: "Company",
              },
              {
                key: "locations",
                label: "Location",
              },
              {
                key: "roles",
                label: "Roles",
              },
              {
                key: "skills",
                label: "Skills",
              },
              {
                key: "jobType",
                label: "Type",
              },
              {
                key: "seniority",
                label: "Seniority",
              },
              {
                key: "compRange",
                label: "USD Range",
              },
              {
                key: "submissionDate",
                label: "Sub. Date",
              },
              {
                key: "actions",
                label: "",
              },
            ]}
            query={myJobsQuery}
            resources={myJobsResources}
            onActionClickSuccess={() => reloadQuery(myJobsQuery)}
            emptyMessage="There are no Jobs right now."
          />
        );
      case "JobList":
        return jobsQuery ? (
          <JobList
            headers={[
              {
                key: "company",
                label: "Company",
              },
              {
                key: "locations",
                label: "Location",
              },
              {
                key: "roles",
                label: "Roles",
              },
              {
                key: "skills",
                label: "Skills",
              },
              {
                key: "jobType",
                label: "Type",
              },
              {
                key: "seniority",
                label: "Seniority",
              },
              {
                key: "compRange",
                label: "USD Range",
              },
              {
                key: "submissionDate",
                label: "Sub. Date",
              },
              {
                key: "actions",
                label: "",
              },
            ]}
            query={jobsQuery}
            resources={jobsResources}
            onActionClickSuccess={() =>
              reloadQuery(jobsQuery as UseQueryResult<JobsResponse>)
            }
            emptyMessage="There are no Jobs right now."
          />
        ) : (
          <></>
        );
      case "MyCandidateList":
        return (
          <CandidateList
            headers={[
              {
                key: "name",
                label: "Candidate",
              },
              {
                key: "locations",
                label: "Location",
              },
              {
                key: "roles",
                label: "Roles",
              },
              {
                key: "skills",
                label: "Skills",
              },
              {
                key: "jobType",
                label: "Type",
              },
              {
                key: "seniority",
                label: "Seniority",
              },
              {
                key: "compRange",
                label: "USD Range",
              },
              {
                key: "submissionDate",
                label: "Sub. Date",
              },
              {
                key: "actions",
                label: (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
                  <button
                    className="border-[#C3C5CA] border-[1px] cursor-pointer flex h-7 items-center justify-center rounded-full w-7"
                    onClick={downloadCsv}
                  >
                    <FontAwesomeIcon
                      icon={faDownload}
                      aria-label="Download CSV"
                    />
                  </button>
                ),
              },
            ]}
            query={myCandidatesQuery}
            resources={myCandidatesResources}
            onActionClickSuccess={() => reloadQuery(myCandidatesQuery)}
            emptyMessage="There are no Candidates right now."
          />
        );
      case "CandidateList":
      default:
        return (
          <CandidateList
            headers={[
              {
                key: "name",
                label: "Candidate",
              },
              {
                key: "locations",
                label: "Location",
              },
              {
                key: "roles",
                label: "Roles",
              },
              {
                key: "skills",
                label: "Skills",
              },
              {
                key: "jobType",
                label: "Type",
              },
              {
                key: "seniority",
                label: "Seniority",
              },
              {
                key: "compRange",
                label: "USD Range",
              },
              {
                key: "submissionDate",
                label: "Sub. Date",
              },
              {
                key: "actions",
                label: (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
                  <button
                    className="border-[#C3C5CA] border-[1px] cursor-pointer flex h-7 items-center justify-center rounded-full w-7"
                    onClick={downloadCsv}
                  >
                    <FontAwesomeIcon
                      icon={faDownload}
                      aria-label="Download CSV"
                    />
                  </button>
                ),
              },
            ]}
            query={candidatesQuery}
            resources={candidatesResources}
            onActionClickSuccess={() => reloadQuery(candidatesQuery)}
            emptyMessage="There are no Candidates right now."
          />
        );
    }
  };

  return (
    <>
      <Head title="Dashboard" />
      <NavPage
        actions={
          <>
            <AnchorButton to="/portal/jobs/new">Upload Job</AnchorButton>
            <AnchorButton className="ml-4" to="/portal/candidates/new">
              Upload Candidate
            </AnchorButton>
            <ProfileButton />
          </>
        }
      >
        <div className="flex overflow-hidden overscroll-contain">
          {["CandidateList", "MyCandidateList"].includes(tabSelected) ? (
            <div className="flex-none w-[600px] overscroll-contain overflow-auto">
              <SidebarFilter
                locationsQuery={locationsQuery}
                rolesQuery={rolesQuery}
                skillsQuery={skillsQuery}
                onSubmit={onSubmitFilters}
              />
            </div>
          ) : null}

          <div className="h-screen flex-nowrap flex-grow overflow-auto overscroll-contain">
            <div className="flex">
              <div className="js-tabs-menu">
                <div className="flex">
                  <MenuItem
                    key="candidates"
                    selected={tabSelected === "CandidateList"}
                    label="Candidates"
                    isLoaded={candidatesQuery.isSuccess}
                    quantity={candidatesResources.length}
                    onClick={() => setTabSelected("CandidateList")}
                  />
                  <MenuItem
                    key="myCandidates"
                    selected={tabSelected === "MyCandidateList"}
                    label="My Candidates"
                    isLoaded={myCandidatesQuery.isSuccess}
                    quantity={myCandidatesResources.length}
                    onClick={() => setTabSelected("MyCandidateList")}
                  />
                  <MenuItem
                    key="introductions"
                    selected={tabSelected === "IntroductionList"}
                    label="Introductions"
                    isLoaded={introductionsQuery.isSuccess}
                    quantity={introductionsResources.length}
                    onClick={() => setTabSelected("IntroductionList")}
                  />
                  {isAdmin() ? (
                    <>
                      <MenuItem
                        key="jobs"
                        selected={tabSelected === "JobList"}
                        label="All Jobs"
                        isLoaded={!!jobsQuery?.isSuccess}
                        quantity={jobsResources.length}
                        onClick={() => setTabSelected("JobList")}
                      />
                      <MenuItem
                        key="signUps"
                        selected={tabSelected === "SignUpList"}
                        label="Signups"
                        isLoaded={!!signUpsQuery?.isSuccess}
                        quantity={signUpsResources.length}
                        onClick={() => setTabSelected("SignUpList")}
                      />
                    </>
                  ) : (
                    <MenuItem
                      key="myJobs"
                      selected={tabSelected === "MyJobList"}
                      label="My Jobs"
                      isLoaded={myJobsQuery.isSuccess}
                      quantity={myJobsResources.length}
                      onClick={() => setTabSelected("MyJobList")}
                    />
                  )}
                </div>

                <hr className="-mt-1 border-[1px] border-[#DADBDE]" />

                <div className="m-6">
                  <Search value={searchValue} setValue={setSearchValue} />

                  {renderContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </NavPage>
    </>
  );
}
