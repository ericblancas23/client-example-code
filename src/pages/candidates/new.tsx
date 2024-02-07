import type {
  CandidatePost,
  CandidateResponse,
  LocationsResponse,
  SeniorityLevel,
  JobType,
  Resume,
} from "@syelo/api";
import {
  createCandidate,
  createResume,
  deleteResume,
  getLocations,
  getRoles,
} from "@syelo/client-api";
import { useState } from "react";
import { AnchorButton } from "../../app/components/Button/AnchorButton";
import { ButtonStyle } from "../../app/components/Button/types";
import { Button } from "../../app/components/Button/Button";
import { Input } from "../../app/components/Input/Input";
import { InputRange } from "../../app/components/InputRange/InputRange";
import { NavPage } from "../../app/components/NavPage/NavPage";
import { RadioGroup } from "../../app/components/RadioGroup/RadioGroup";
import { TextArea } from "../../app/components/TextArea/TextArea";
import { DragAndDrop } from "../../app/components/DragAndDrop/DragAndDrop";
import { useNavigate } from "react-router-dom";
import { Head } from "../../app/components/Head/Head";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useQuery, type UseQueryResult } from "react-query";
import { SelectGroup } from "../../app/components/SelectGroup/SelectGroup.tsx";
import { Checkbox } from "../../app/components/Checkbox/checkbox.tsx";
import { FullPageForm } from "../../app/components/FullPageForm/FullPageForm.tsx";
import { useLoading } from "../../hooks/useLoading.ts";
import {
  ValidatedInput,
  ValidationType,
} from "../../app/components/ValidatedInput/ValidatedInput.tsx";
import type { SkillsResponse } from "@syelo/api";
import { getSkills } from "@syelo/client-api/dist/skills";

enum VisaSponsorship {
  Yes = "Yes",
  No = "No",
}

export default function CandidateNew() {
  const navigate = useNavigate();
  const { authToken } = useCurrentUser();
  const [active, setActive] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [selectedLocationIds, setSelectedLocationIds] = useState<string[]>([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [jobType, setJobType] = useState<JobType>("All" as JobType);
  const [seniorityLevel, setSeniorityLevel] = useState<SeniorityLevel>(
    "Entry-level" as SeniorityLevel
  );
  const [compRange, setCompRange] = useState<
    [number | undefined, number | undefined]
  >([undefined, undefined]);
  const [notes, setNotes] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const { loading, startLoading, stopLoading } = useLoading(false);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeDeleting, setResumeDeleting] = useState(false);
  const [visaSponsorshipSelection, setVisaSponsorshipSelection] =
    useState<VisaSponsorship>();
  const [permissionSelection, setPermissionSelection] =
    useState<boolean>(false);
  const [permissionError, setPermissionError] = useState<string | undefined>();

  const [resumeId, setResumeId] = useState("");

  const fillCandidateInfoFromResume = (resume: Resume) => {
    const info = resume.candidateInfo;

    if (info.companyName) {
      setCompanyName(info.companyName);
    }

    if (info.companyUrl) {
      setCompanyUrl(info.companyUrl);
    }

    if (info.email) {
      setEmail(info.email);
    }

    if (info.fullName) {
      setFullName(info.fullName);
    }

    if (info.locationIds && info.locationIds.length > 0) {
      setSelectedLocationIds(info.locationIds);
    }

    if (info.roleIds && info.roleIds.length > 0) {
      setSelectedRoleIds(info.roleIds);
    }

    // TODO: Add a check for info.skillIds once Skills are supported
    // (@job13er 2023-10-14)
  };

  const setResumeFile = (file: File | null) => {
    setFile(file);

    if (file) {
      setResumeLoading(true);
      const form = new FormData();
      form.append("resume", file);
      createResume(form, { token: authToken })
        .then((resp) => {
          setResumeId(resp.data.id);
          fillCandidateInfoFromResume(resp.data);
          setResumeLoading(false);
        })
        .catch((err) => {
          setResumeLoading(false);
          // TODO: Better error handling (@job13er 2023-10-14)
          console.error(err);
        });
    } else if (resumeId) {
      setResumeDeleting(true);
      deleteResume(resumeId, { token: authToken })
        .then(() => {
          setResumeDeleting(false);
        })
        .catch((err) => {
          setResumeDeleting(false);
          // TODO: Better error handling (@job13er 2023-10-14)
          console.error(err);
        });
    }
  };

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

  const setJobTypeSelection = (value: JobType | undefined) => {
    setJobType(value || ("All" as JobType));
  };

  const setSeniorityLevelSelection = (value: SeniorityLevel | undefined) => {
    setSeniorityLevel(value || ("Entry-level" as SeniorityLevel));
  };

  const onSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (!permissionSelection) {
      setPermissionError("You must have permission to upload this Candidate");
      return;
    } else {
      setPermissionError(undefined);
    }

    const [compensationMin, compensationMax] = compRange;

    startLoading();

    const controller = new AbortController();

    const visaSponsorship = visaSponsorshipSelection === VisaSponsorship.Yes;

    const candidate: CandidatePost = {
      companyName,
      companyUrl,
      compensationMax: compensationMax || 0,
      compensationMin: compensationMin || 0,
      email,
      fullName,
      jobType,
      linkedInUrl,
      roleIds: selectedRoleIds,
      visaSponsorship,
      resumeId: resumeId || undefined,
      resumePath: "", // Unused, left for backward compatability (@job13er 2023-10-14)
      notes,
      locationIds: selectedLocationIds,
      seniorityLevel,
      skillIds: selectedSkillIds,
    };

    createCandidate(candidate, {
      signal: controller.signal,
      token: authToken,
    })
      .then((response: CandidateResponse) => {
        navigate(`/portal/candidates/${response.data.id}/confirmation`);
      })
      .catch((error) => {
        if (controller.signal.aborted) {
          return;
        }

        // TODO: Surface error to user once the API is ready
        console.log(error);
      })
      .finally(stopLoading);
  };

  return (
    <>
      <Head title="Upload Candidate" />
      <NavPage
        breadcrumbs={[{ label: "Upload Candidate" }]}
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
              Upload Candidate
            </Button>
          </>
        }
      >
        <FullPageForm>
          <DragAndDrop
            deleting={resumeDeleting}
            label="Candidate Resume"
            loading={resumeLoading}
            placeholder="Drag & drop a Resume (.pdf, .doc, or .docx)"
            value={file}
            setValue={setResumeFile}
          />
          <Input
            label="Candidate Name"
            placeholder="Enter candidate full name"
            required
            value={fullName}
            onChange={setFullName}
          />
          <ValidatedInput
            validationType={ValidationType.email}
            disabled={loading}
            label="Email"
            placeholder="Type candidate's email address"
            setValue={setEmail}
            backendError={emailError}
            setBackendError={setEmailError}
            errorText="Email is not a valid email format"
            required={true}
            value={email}
          />
          <ValidatedInput
            validationType={ValidationType.url}
            disabled={loading}
            errorText="LinkedIn profile is not a valid URL"
            jsHandle="js-linkedin-url"
            label="LinkedIn Profile URL"
            placeholder="Enter URL to candidate's LinkedIn profile"
            value={linkedInUrl}
            setValue={setLinkedInUrl}
            required={true}
          />
          <Input
            label="Candidate Company Name"
            placeholder="Enter name of Candidate's current company"
            required
            value={companyName}
            onChange={setCompanyName}
          />
          <Input
            label="Candidate Company URL"
            placeholder="Enter URL of Candidate's current company"
            required
            value={companyUrl}
            onChange={setCompanyUrl}
          />
          <RadioGroup
            label="Job Type"
            options={[
              "All" as JobType,
              "On-site" as JobType,
              "Remote" as JobType,
              "Hybrid" as JobType,
            ]}
            value={jobType}
            onChange={setJobTypeSelection}
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
            leftAlignPx="600px"
          />
          <SelectGroup
            label="Desired Roles"
            modalTitle="Select Desired Roles"
            searchPlaceholder="Search for Role"
            toggleActive={() => setActive(active === "role" ? "" : "role")}
            active={active === "role"}
            selectIds={setSelectedRoleIds}
            query={rolesQuery}
            leftAlignPx="600px"
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
          <RadioGroup
            label="Seniority"
            options={[
              // FIXME: Figure out how to import enums (@job13er 2023-10-14)
              "Internship" as SeniorityLevel,
              "Entry-levl" as SeniorityLevel,
              "Associate" as SeniorityLevel,
              "Mid-senior" as SeniorityLevel,
              "Director" as SeniorityLevel,
              "Executive" as SeniorityLevel,
            ]}
            value={seniorityLevel}
            onChange={setSeniorityLevelSelection}
          />
          <InputRange
            label="USD Compensation Range"
            value={compRange}
            onChange={setCompRange}
          />
          <RadioGroup
            label="Do You Need Visa Sponsorship?"
            options={[VisaSponsorship.Yes, VisaSponsorship.No]}
            value={visaSponsorshipSelection}
            onChange={setVisaSponsorshipSelection}
          />
          <Checkbox
            name="Upload Candidate Permission"
            value={permissionSelection}
            error={permissionError}
            onChange={setPermissionSelection}
          >
            <span className="uppercase">
              Do You Have Explicit Permission To Share This Candidate?
            </span>
          </Checkbox>
          <TextArea
            className="mb-0"
            label="Notes"
            placeholder="Type a note here"
            required
            value={notes}
            onChange={setNotes}
          />
        </FullPageForm>
      </NavPage>
    </>
  );
}
