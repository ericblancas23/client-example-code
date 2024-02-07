import { AnchorButton } from "../app/components/Button/AnchorButton";
import CardPage from "../app/components/CardPage/CardPage";

export default function ResetPasswordConfirmation() {
  return (
    <CardPage title="Password changed!">
      <div className="text-center">
        Your password has been successfully changed.
        <br />
        You can login with your new password.
      </div>
      <AnchorButton className="mt-6" fill to="/sign-in">
        Login
      </AnchorButton>
    </CardPage>
  );
}
