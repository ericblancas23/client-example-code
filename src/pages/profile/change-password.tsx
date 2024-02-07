import { useState } from "react";

import { usePassword } from "../../hooks/usePassword";
import { AnchorButton } from "../../app/components/Button/AnchorButton";
import { Button } from "../../app/components/Button/Button";
import { PasswordInput } from "../../app/components/PasswordInput/PasswordInput";
import { NavPage } from "../../app/components/NavPage/NavPage";
import { ButtonStyle } from "../../app/components/Button/types";
import type { ChangePasswordBody, Error } from "@syelo/api";
import { useBool } from "../../hooks/useBool.ts";
import { useCurrentUser } from "../../hooks/useCurrentUser.ts";
import { useNavigate } from "react-router-dom";
import { changePassword } from "@syelo/client-api/dist/authentication/api";
import { Head } from "../../app/components/Head/Head.tsx";

export default function ChangePassword() {
  const navigate = useNavigate();
  const {
    lengthError,
    numberError,
    password,
    specialCharacterError,
    setPassword,
    uppercaseError,
  } = usePassword();
  const { authToken, currentUser } = useCurrentUser();
  const {
    setFalse: stopLoading,
    setTrue: startLoading,
    value: loading,
  } = useBool(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const showMismatchError =
    confirmPassword && password && confirmPassword !== password;

  const onClickSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (showMismatchError) {
      return;
    }

    startLoading();

    const controller = new AbortController();

    const user: ChangePasswordBody = {
      newPassword: password,
    };

    changePassword(currentUser.id, user, {
      token: authToken,
      signal: controller.signal,
    })
      .then(() => {
        navigate("/portal/profile/change-password-confirmation");
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
    <>
      <Head title="Change Password" />
      <NavPage
        breadcrumbs={[
          { to: "/portal/profile", label: "Profile" },
          { label: "Change password" },
        ]}
        footer={
          <>
            <AnchorButton to="/portal/profile" style={ButtonStyle.SECONDARY}>
              Back
            </AnchorButton>
            <Button
              disabled={
                loading ||
                lengthError ||
                numberError ||
                !password ||
                password !== confirmPassword
              }
              onClick={onClickSubmit}
            >
              Save settings
            </Button>
          </>
        }
      >
        <div className="m-auto max-w-full p-6 w-[636px]">
          <form>
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
          </form>
        </div>
      </NavPage>
    </>
  );
}
