import type { Error, SessionResponse } from "@syelo/api";
import { signInUser } from "@syelo/client-api/src/authentication/api";
import { useState } from "react";
import { useBool } from "../hooks/useBool";
import { Button } from "../app/components/Button/Button";
import CardPage from "../app/components/CardPage/CardPage";
import CreateAccountFooter from "../app/components/CreateAccountFooter/CreateAccountFooter";
import { PasswordInput } from "../app/components/PasswordInput/PasswordInput";
import { Head } from "../app/components/Head/Head";
import { Navigate, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { Checkbox } from "../app/components/Checkbox/checkbox.tsx";
import {
  ValidatedInput,
  ValidationType,
} from "../app/components/ValidatedInput/ValidatedInput.tsx";

export default function SignIn() {
  const navigate = useNavigate();
  const { login, authToken } = useCurrentUser();

  const {
    setFalse: stopLoading,
    setTrue: startLoading,
    value: loading,
  } = useBool(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toggle: toggleKeepLoggedIn, value: keepLoggedIn } = useBool(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onSignInClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    startLoading();

    setPasswordError("");
    setEmailError("");

    const controller = new AbortController();

    const credentials = {
      email,
      password,
      keep: keepLoggedIn,
    };

    signInUser(credentials, controller)
      .then((response: SessionResponse) => {
        login(response.data.token, response.data.user);
        navigate("/portal/dashboard");
      })
      .catch((error: Error) => {
        switch (error.code) {
          case "UserUnverified":
            setEmailError(error.message || "Unverified");
            break;
          case "Unauthenticated":
            setEmailError(error.message || "Bad credentials");
            setPasswordError(error.message || "Bad credentials");
            break;
          case "UserDenied":
            navigate("/access-denied");
            break;
          default:
            console.log(error);
        }
      })
      .finally(stopLoading);
  };

  return authToken ? (
    <Navigate to="/portal/dashboard" />
  ) : (
    <>
      <Head title="Sign In" />
      <CardPage footer={<CreateAccountFooter />} title="Log in to your account">
        <form>
          <ValidatedInput
            validationType={ValidationType.email}
            autoComplete="username"
            className="mt-6"
            disabled={loading}
            jsHandle="js-email"
            label="Email"
            placeholder="Type candidate's email address"
            setValue={setEmail}
            backendError={emailError}
            setBackendError={setEmailError}
            errorText="Email is not a valid email format"
            required={true}
            value={email}
          />
          <PasswordInput
            autoComplete="password"
            disabled={loading}
            error={passwordError}
            jsHandle={"js-password"}
            label="Password"
            onChange={setPassword}
            placeholder="Type your password"
            required={true}
            value={password}
          />
          <Checkbox
            onChange={toggleKeepLoggedIn}
            value={keepLoggedIn}
            name="remember"
          >
            Keep me logged in
          </Checkbox>
          <Button
            className="js-submit-sign-in mt-6"
            fill
            loading={loading}
            onClick={onSignInClick}
          >
            Log in
          </Button>
        </form>
      </CardPage>
    </>
  );
}
