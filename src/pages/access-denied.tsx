import { AnchorButton } from "../app/components/Button/AnchorButton";
import CardPage from "../app/components/CardPage/CardPage";

export default function AccessDenied() {
  return (
    <CardPage title="Your request has been denied!">
      You can try again in x time.
      <AnchorButton className="mt-6" fill to="/sign-in">
        Return to login
      </AnchorButton>
    </CardPage>
  );
}
