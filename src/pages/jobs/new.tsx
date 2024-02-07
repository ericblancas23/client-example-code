import { createJob } from "@syelo/client-api/src/jobs/api";
import type { JobType, SeniorityLevel } from "@syelo/types/src/shared";
import { JobTypeValues, SeniorityLevelValues } from "@syelo/types/src/shared";
import { useState } from "react";

import { useBool } from "../../hooks/useBool";
import { AnchorButton } from "../../app/components/Button/AnchorButton";
import { Button } from "../../app/components/Button/Button";
import { Input } from "../../app/components/Input/Input";
import { InputRange } from "../../app/components/InputRange/InputRange";
import { NavPage } from "../../app/components/NavPage/NavPage";
import { RadioGroup } from "../../app/components/RadioGroup/RadioGroup";
import { TextArea } from "../../app/components/TextArea/TextArea";
import { ButtonStyle } from "../../app/components/Button/types";
import { useNavigate } from "react-router-dom";
import { Head } from "../../app/components/Head/Head";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import type {
  JobResponse,
  LocationsResponse,
  SkillsResponse,
} from "@syelo/api";
import { useQuery, type UseQueryResult } from "react-query";
import { getLocations, getRoles } from "@syelo/client-api";
import { SelectGroup } from "../../app/components/SelectGroup/SelectGroup.tsx";
import { FullPageForm } from "../../app/components/FullPageForm/FullPageForm";
import {
  ValidatedInput,
  ValidationType,
} from "../../app/components/ValidatedInput/ValidatedInput.tsx";
import { getSkills } from "@syelo/client-api/dist/skills";

export default function JobNew() {
  const navigate = useNavigate();
  const { authToken } = useCurrentUser();

  const [active, setActive] = useState("");
  const [selectedLocationIds, setSelectedLocationIds] = useState<string[]>([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [jobType, setJobType] = useState<JobType>();
  const [seniorityLevel, setSeniorityLevel] = useState<SeniorityLevel>();
  const [compRange, setCompRange] = useState<
    [number | undefined, number | undefined]
  >([undefined, undefined]);
  const [visaSponsorship, setVisaSponsorship] = useState<string | undefined>(
    "No"
  );
  const [notes, setNotes] = useState("");
  const {
    setFalse: stopLoading,
    setTrue: startLoading,
    value: loading,
  } = useBool(false);

  const locationsQuery: UseQueryResult<LocationsResponse> = useQuery(
    "locations",
    ({ signal }): Promise<LocationsResponse> =>
      getLocations({
        signal: signal,
        token: authToken,
      })
  );

  const rolesQuery: UseQueryResult<LocationsResponse> = useQuery(
    "roles",
    ({ signal }): Promise<LocationsResponse> =>
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
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);

  const onSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    // TODO: should this be nullable?
    const compensationMin = compRange[0] || 0;
    const compensationMax = compRange[1] || 0;

    if (!jobType || !seniorityLevel) return;

    startLoading();

    const controller = new AbortController();

    createJob(
      {
        companyName,
        companyUrl,
        compensationMax,
        compensationMin,
        jobType,
        locationIds: selectedLocationIds,
        notes,
        roleIds: selectedRoleIds,
        skillIds: selectedSkillIds,
        seniorityLevel,
        visaSponsorship: visaSponsorship === "Yes",
      },
      { token: authToken, signal: controller.signal }
    )
      .then((response: JobResponse) => {
        navigate(`/portal/jobs/${response.data.id}/confirmation`);
      })
      .catch((error) => {
        if (controller.signal.aborted) {
          return;
        }

        // TODO: Surface error to user
        console.log(error);
      })
      .finally(stopLoading);
  };

  return (
    <>
      <Head title="Upload Job" />
      <NavPage
        breadcrumbs={[{ label: "Upload Job" }]}
        footer={
          <>
            <AnchorButton
              disabled={loading}
              to="/portal/dashboard"
              style={ButtonStyle.SECONDARY}
            >
              Cancel
            </AnchorButton>
            <Button disabled={loading} onClick={onSubmit}>
              Upload Job
            </Button>
          </>
        }
      >
        <FullPageForm>
          <Input
            label="Company Name"
            placeholder="Enter company name"
            value={companyName}
            onChange={setCompanyName}
            required={true}
          />
          <ValidatedInput
            validationType={ValidationType.url}
            disabled={loading}
            label="Company URL"
            errorText="Company URL is not a valid URL"
            placeholder="Enter company URL"
            value={companyUrl}
            setValue={setCompanyUrl}
            required={true}
          />
          <RadioGroup
            label="Job Type"
            options={JobTypeValues}
            value={jobType}
            onChange={setJobType}
          />
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
            leftAlignPx="1000px"
          />
          <SelectGroup
            label="Skill"
            modalTitle="Select Skills"
            searchPlaceholder="Search for Skills"
            toggleActive={() => setActive(active === "skill" ? "" : "skill")}
            active={active === "skill"}
            selectIds={setSelectedSkillIds}
            query={skillsQuery}
            leftAlignPx="1000px"
          />
          <SelectGroup
            label="Job Title"
            modalTitle="Select Job Titles"
            searchPlaceholder="Search for Job Titles"
            toggleActive={() => setActive(active === "role" ? "" : "role")}
            active={active === "role"}
            selectIds={setSelectedRoleIds}
            query={rolesQuery}
            leftAlignPx="1000px"
          />
          <RadioGroup
            label="Seniority"
            options={SeniorityLevelValues}
            value={seniorityLevel}
            onChange={setSeniorityLevel}
          />
          <InputRange
            label="USD Compensation Range"
            value={compRange}
            onChange={setCompRange}
          />
          <RadioGroup
            label="Visa Sponsorship"
            options={["Yes", "No"]}
            value={visaSponsorship}
            onChange={setVisaSponsorship}
          />
          <TextArea
            className="mb-0"
            label="Notes"
            placeholder="Type a note here"
            value={notes}
            onChange={setNotes}
          />
        </FullPageForm>
      </NavPage>
    </>
  );
}
