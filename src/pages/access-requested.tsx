import { AnchorButton } from "../app/components/Button/AnchorButton";
import CardPage from "../app/components/CardPage/CardPage";

export default function AccessRequested() {
  return (
    <CardPage
      title={
        <>
          Thank you for
          <br />
          requesting access.
        </>
      }
    >
      Please note that your access request is currently being reviewed and it
      may take between 24 to 48 hours to approve or deny your request.
      <br />
      We appreciate your patience.
      <AnchorButton jsHandle="js-enter-app" className="mt-6" fill to="/sign-in">
        Take Me To Sign In
      </AnchorButton>
    </CardPage>
  );
}
