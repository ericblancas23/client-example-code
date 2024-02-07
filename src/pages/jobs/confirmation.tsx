import { AnchorButton } from "../../app/components/Button/AnchorButton";
import { ButtonStyle } from "../../app/components/Button/types";
import Card from "../../app/components/Card/Card";
import { NavPage } from "../../app/components/NavPage/NavPage";
import { Head } from "../../app/components/Head/Head";

export default function JobConfirmation() {
  return (
    <>
      <Head title="Upload Confirmed" />
      <NavPage breadcrumbs={[{ label: "Upload Job" }]}>
        <div className="m-auto max-w-full p-6">
          <Card title="Job Uploaded!">
            <div className="text-center">
              You can view the jobs under the &quot;Jobs&quot; tab.
            </div>
            <AnchorButton className="mt-6" fill to="/portal/jobs/new">
              Upload another Job
            </AnchorButton>
            <AnchorButton
              className="mt-6"
              fill
              to="/portal/dashboard"
              style={ButtonStyle.SECONDARY}
            >
              Go to dashboard
            </AnchorButton>
          </Card>
        </div>
      </NavPage>
    </>
  );
}
