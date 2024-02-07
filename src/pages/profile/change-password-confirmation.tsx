import { AnchorButton } from "../../app/components/Button/AnchorButton";
import Card from "../../app/components/Card/Card";
import { NavPage } from "../../app/components/NavPage/NavPage";
import { Head } from "../../app/components/Head/Head.tsx";

export default function ChangePasswordConfirmation() {
  return (
    <>
      <Head title="Password Confirmed" />
      <NavPage
        breadcrumbs={[
          { to: "/portal/profile", label: "Profile" },
          { label: "Change password" },
        ]}
      >
        <div className="m-auto max-w-full p-6">
          <Card title="Password changed!">
            <div className="text-center">
              Your password has been successfully changed.
              <br />
              You can login with your new password.
            </div>
            <AnchorButton className="mt-6" fill to="/portal/dashboard">
              Return to dashboard
            </AnchorButton>
          </Card>
        </div>
      </NavPage>
    </>
  );
}
