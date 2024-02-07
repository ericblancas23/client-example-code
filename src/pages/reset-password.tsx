import type { Error, ResetPasswordPost } from "@syelo/api";
import { resetPassword } from "@syelo/client-api/src";
import { useState } from "react";
import { usePassword } from "../hooks/usePassword";
import { Button } from "../app/components/Button/Button";
import CardPage from "../app/components/CardPage/CardPage";
import { PasswordInput } from "../app/components/PasswordInput/PasswordInput";
import { RememberPasswordFooter } from "../app/components/RememberPasswordFooter/RememberPasswordFooter";
import { useNavigate } from "react-router-dom";
import { useBool } from "../hooks/useBool";
import { useQueryParams } from "../hooks/useQueryParams.ts";

export default function ResetPassword() {
  const {
    lengthError,
    numberError,
    password,
    specialCharacterError,
    setPassword,
    uppercaseError,
  } = usePassword();
  const [confirmPassword, setConfirmPassword] = useState("");
  const showMismatchError =
    confirmPassword && password && confirmPassword !== password;

  const controller = new AbortController();
  const navigator = useNavigate();
  const query = useQueryParams();
  const email = query.get("email") || "";
  const token = query.get("token") || "";

  const {
    setFalse: stopLoading,
    setTrue: startLoading,
    value: loading,
  } = useBool(false);

  const onSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (showMismatchError) {
      return;
    }

    startLoading();

    const body: ResetPasswordPost = {
      email,
      newPassword: password,
    };

    resetPassword(token, body, {
      signal: controller.signal,
    })
      .then(() => {
        navigator("/reset-password-confirmation");
      })
      .catch((error: Error) => {
        if (controller.signal.aborted) {
          return;
        }
        console.error(error);
      })
      .finally(stopLoading);
  };

  return (
    <CardPage footer={<RememberPasswordFooter />} title="Reset your password">
      <PasswordInput
        allowToReset={false}
        autoComplete="off"
        disabled={loading}
        jsHandle="js-password"
        label="New Password"
        lengthError={lengthError}
        numberError={numberError}
        onChange={setPassword}
        passwordHintVisible={!!password.length}
        placeholder="Type your new password"
        specialCharacterError={specialCharacterError}
        uppercaseError={uppercaseError}
        value={password}
      />
      <PasswordInput
        allowToReset={false}
        autoComplete="off"
        className="mb-0"
        disabled={loading}
        error={showMismatchError ? "Passwords do not match" : undefined}
        jsHandle="js-password-confirmation"
        label="Confirm Password"
        onChange={setConfirmPassword}
        placeholder="Type your new password again"
        value={confirmPassword}
      />
      <Button
        disabled={
          loading ||
          lengthError ||
          numberError ||
          !password ||
          password !== confirmPassword
        }
        onClick={onSubmit}
        fill
      >
        Reset password
      </Button>
    </CardPage>
  );
}
