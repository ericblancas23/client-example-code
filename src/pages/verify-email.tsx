import { type Error } from "@syelo/api";
import { verifyEmail } from "@syelo/client-api/src";
import { useEffect, useState } from "react";
import { AnchorButton } from "../app/components/Button/AnchorButton";
import CardPage from "../app/components/CardPage/CardPage";
import { useQueryParams } from "../hooks/useQueryParams";

type Status = "loading" | "successful" | "failed";

export default function VerifyEmail() {
  const [status, setStatus] = useState<Status>("loading");
  const query = useQueryParams();
  useEffect(() => {
    const email = query.get("email") || "";
    const token = query.get("token") || "";
    const controller = new AbortController();

    verifyEmail(token, { email }, controller)
      .then(() => {
        setStatus("successful");
      })
      .catch((err: Error) => {
        if (controller.signal.aborted) {
          return;
        }
        setStatus("failed");
        console.error(err);
      });
  }, []);

  let title = "Verifying email...";
  let message = "We are currently verifying your email address";
  if (status === "successful") {
    title = "Email verified!";
    message =
      "Now that your email address has been verified, you should receive an email soon once your account is approved. Once your account has been approved, you can enter the app below.";
  } else if (status === "failed") {
    title = "Invalid link";
    message =
      "It seems something went wrong when verifying your email address.";
  }

  return (
    <CardPage title={title}>
      {message}
      <AnchorButton
        className="mt-6"
        disabled={status !== "successful"}
        fill
        to="/sign-in"
      >
        Enter the app
      </AnchorButton>
    </CardPage>
  );
}
