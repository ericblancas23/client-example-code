import { AnchorButton } from "../app/components/Button/AnchorButton";
import CardPage from "../app/components/CardPage/CardPage";

export default function AccessApproved() {
  return (
    <CardPage title="Your request is now approved!">
      You can use the app to upload candidates or jobs, and also see candidates
      or jobs posted by other recruiters.
      <AnchorButton className="mt-6" fill to="/sign-in">
        Enter the app
      </AnchorButton>
    </CardPage>
  );
}
