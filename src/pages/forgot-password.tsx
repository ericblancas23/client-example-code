import { createEmailToken } from "@syelo/client-api/src";
import { useState } from "react";
import { useBool } from "../hooks/useBool";
import { Input } from "../app/components/Input/Input";
import { Button } from "../app/components/Button/Button";
import CardPage from "../app/components/CardPage/CardPage";
import { RememberPasswordFooter } from "../app/components/RememberPasswordFooter/RememberPasswordFooter";
import type { EmailTokenReason } from "@syelo/api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const {
    setFalse: stopLoading,
    setTrue: startLoading,
    value: loading,
  } = useBool(false);
  const [email, setEmail] = useState("");
  const navigator = useNavigate();

  const onSubmit = () => {
    if (email.length === 0) return;

    startLoading();

    createEmailToken(
      { email, reason: "reset-password" as EmailTokenReason },
      {}
    )
      .then(() => {
        navigator("/forgot-password-confirmation");
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        // TODO: Add is still mounted check
        stopLoading();
      });
  };

  return (
    <CardPage footer={<RememberPasswordFooter />} title="Forgot your password?">
      <Input
        className="mt-6"
        disabled={loading}
        label="Email"
        placeholder="Type your email"
        value={email}
        onChange={setEmail}
      />
      <Button disabled={loading} fill onClick={onSubmit}>
        Reset password
      </Button>
    </CardPage>
  );
}
