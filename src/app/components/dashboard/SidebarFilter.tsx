import type { JobType, SeniorityLevel } from "@syelo/types/src/shared";
import { JobTypeValues, SeniorityLevelValues } from "@syelo/types/src/shared";

import { Button } from "../Button/Button";
import { ButtonStyle } from "../Button/types";
import { InputRange } from "../InputRange/InputRange";
import { RadioGroup } from "../RadioGroup/RadioGroup";
import { SelectGroup } from "../SelectGroup/SelectGroup";
import { useState } from "react";
import type { UseQueryResult } from "react-query";
import type { RolesResponse, LocationsResponse } from "@syelo/api";
import type { Filter } from "@syelo/client-api/dist/types";
import type { SkillsResponse } from "@syelo/api";

interface SelectGroupItem {
  locationsQuery: UseQueryResult<LocationsResponse>;
  rolesQuery: UseQueryResult<RolesResponse>;
  skillsQuery: UseQueryResult<SkillsResponse>;
  onSubmit: (filters: Filter) => void;
}

export default function SidebarFilter({
  locationsQuery,
  rolesQuery,
  skillsQuery,
  onSubmit,
}: SelectGroupItem) {
  const [selectedLocationIds, setSelectedLocationIds] = useState<string[]>([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [jobType, setJobType] = useState<JobType>();
  const [seniority, setSeniority] = useState<SeniorityLevel>();
  const [compRange, setCompRange] = useState<
    [number | undefined, number | undefined]
  >([undefined, undefined]);
  const [submissionDate, setSubmissionDate] = useState<string>();
  const [visaSponsorship, setVisaSponsorship] = useState<string>();
  const [active, setActive] = useState("");

  const onClickSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setActive("");

    const filters: Filter = {};

    if (selectedLocationIds.length > 0) {
      filters.locationIds = selectedLocationIds;
    }
    if (selectedRoleIds.length > 0) {
      filters.roleIds = selectedRoleIds;
    }
    if (selectedSkillIds.length > 0) {
      filters.skillIds = selectedSkillIds;
    }
    if (jobType) {
      filters.jobTypes = [jobType];
    }
    if (seniority) {
      filters.seniorityLevels = [seniority];
    }
    if (compRange[0]) {
      filters.compensationMin = compRange[0];
    }
    if (compRange[1]) {
      filters.compensationMax = compRange[1];
    }
    if (submissionDate) {
      const now = new Date();
      switch (submissionDate) {
        case "Last 7d":
          // within the last 7 days
          filters.createdAtGte = now.getTime() - 7 * 24 * 60 * 60 * 1000;
          break;
        case "Last mo.":
          // within the last 31 days
          filters.createdAtGte = now.getTime() - 31 * 24 * 60 * 60 * 1000;
          break;
        case "Last 3 mo.":
          // within the last 93 days
          filters.createdAtGte = now.getTime() - 3 * 31 * 24 * 60 * 60 * 1000;
          break;
        case "Last 6 mo.":
          // within the last 186 days
          filters.createdAtGte = now.getTime() - 6 * 31 * 24 * 60 * 60 * 1000;
          break;
        case "Last 9 mo.":
          // within the last 279 days
          filters.createdAtGte = now.getTime() - 9 * 31 * 24 * 60 * 60 * 1000;
          break;
        case "Last year":
          // within the last 365 days
          filters.createdAtGte = now.getTime() - 365 * 24 * 60 * 60 * 1000;
          break;
      }
    }
    if (visaSponsorship) {
      filters.visaSponsorship = visaSponsorship === "Yes";
    }

    onSubmit(filters);
  };

  return (
    <div className="bg-white h-screen flex flex-col">
      <div className="top-0 px-6 py-4 bg-white">
        <p className={`inter700 mb-4 text-2xl text-[#525766]  `}>
          Filter Candidates
        </p>
      </div>
      <div className="overflow-auto flex-1 px-6 py-4">
        <SelectGroup
          label="Location"
          modalTitle="Select Locations"
          searchPlaceholder="Search for Location"
          toggleActive={() =>
            setActive(active === "location" ? "" : "location")
          }
          active={active === "location"}
          selectIds={setSelectedLocationIds}
          query={locationsQuery}
          leftAlignPx="600px"
        />
        <SelectGroup
          label="Desired Roles"
          modalTitle="Select Roles"
          searchPlaceholder="Search for Role"
          toggleActive={() => setActive(active === "role" ? "" : "role")}
          active={active === "role"}
          selectIds={setSelectedRoleIds}
          query={rolesQuery}
          leftAlignPx="600px"
        />
        <SelectGroup
          label="Desired Skills"
          modalTitle="Select Skills"
          searchPlaceholder="Search for Skill"
          toggleActive={() => setActive(active === "skill" ? "" : "skill")}
          active={active === "skill"}
          selectIds={setSelectedSkillIds}
          query={skillsQuery}
          leftAlignPx="600px"
        />

        <RadioGroup
          label="Job Type"
          options={JobTypeValues}
          value={jobType}
          onChange={setJobType}
        />

        <RadioGroup
          label="Seniority"
          options={SeniorityLevelValues}
          value={seniority}
          onChange={setSeniority}
        />

        <InputRange
          label="USD Compensation Range"
          value={compRange}
          onChange={setCompRange}
        />

        <RadioGroup
          label="Date of Submission"
          options={[
            "Last 7d",
            "Last mo.",
            "Last 3 mo.",
            "Last 6 mo.",
            "Last 9 mo.",
            "Last year",
          ]}
          value={submissionDate}
          onChange={setSubmissionDate}
        />

        <RadioGroup
          label="Visa Sponsorship"
          options={["Yes", "No"]}
          value={visaSponsorship}
          onChange={setVisaSponsorship}
        />
      </div>

      <div className="sticky bottom-0 py-4 border-t-2 border-[#D0D0D0] bg-white">
        <Button
          fill
          large
          style={ButtonStyle.SECONDARY}
          onClick={onClickSubmit}
        >
          View Results
        </Button>
      </div>
    </div>
  );
}
