import { type Error } from "@syelo/api";
import { useState } from "react";

import { useBool } from "../hooks/useBool";
import { usePassword } from "../hooks/usePassword";
import { Button } from "../app/components/Button/Button";
import CardPage from "../app/components/CardPage/CardPage";
import { Input } from "../app/components/Input/Input";
import { LogInFooter } from "../app/components/LogInFooter/LogInFooter";
import { PasswordInput } from "../app/components/PasswordInput/PasswordInput";
import { Head } from "../app/components/Head/Head";
import { signUpUser } from "@syelo/client-api/src/authentication";
import { useNavigate } from "react-router-dom";
import {
  ValidatedInput,
  ValidationType,
} from "../app/components/ValidatedInput/ValidatedInput.tsx";

export default function SignUp() {
  const {
    lengthError,
    numberError,
    password,
    specialCharacterError,
    setPassword,
    uppercaseError,
  } = usePassword();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const {
    setFalse: stopLoading,
    setTrue: startLoading,
    value: loading,
  } = useBool(false);

  const submitForm = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (lengthError || uppercaseError || numberError || specialCharacterError) {
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    startLoading();

    const controller = new AbortController();

    const user = {
      fullName,
      email,
      companyName,
      companyUrl,
      linkedInUrl,
      password,
    };

    signUpUser(user, controller)
      .then(() => {
        navigate("/access-requested");
      })
      .catch((error: Error) => {
        if (controller.signal.aborted) {
          return;
        }

        if (error.code === "DuplicateEmail") {
          setEmailError(error.message || "Invalid");
        } else {
          console.error(error);
        }
      })
      .finally(stopLoading);
  };

  return (
    <>
      <Head title="Sign Up" />
      <CardPage footer={<LogInFooter />} title="Create an account">
        <form>
          <Input
            className="mt-6"
            disabled={loading}
            jsHandle="js-full-name"
            label="Full name"
            onChange={setFullName}
            placeholder="Type your name"
            value={fullName}
            required={true}
          />
          <ValidatedInput
            validationType={ValidationType.email}
            disabled={loading}
            jsHandle="js-email"
            label="Email"
            placeholder="Type your email"
            setValue={setEmail}
            backendError={emailError}
            setBackendError={setEmailError}
            errorText="Email is not a valid email format"
            required={true}
            value={email}
          />
          <Input
            disabled={loading}
            jsHandle="js-company-name"
            label="Company Name"
            onChange={setCompanyName}
            placeholder="Type your company name"
            value={companyName}
            required={true}
          />
          <ValidatedInput
            validationType={ValidationType.url}
            disabled={loading}
            jsHandle="js-company-url"
            label="Company URL"
            errorText="Company URL is not a valid URL"
            placeholder="Type your company URL"
            value={companyUrl}
            setValue={setCompanyUrl}
            required={true}
          />
          <ValidatedInput
            validationType={ValidationType.url}
            disabled={loading}
            errorText="LinkedIn profile is not a valid URL"
            jsHandle="js-linkedin-url"
            label="LinkedIn profile"
            placeholder="Type your LinkedIn profile"
            value={linkedInUrl}
            setValue={setLinkedInUrl}
            required={true}
          />
          <PasswordInput
            allowToReset={false}
            autoComplete="off"
            disabled={loading}
            jsHandle="js-password"
            label="password"
            lengthError={lengthError}
            numberError={numberError}
            onChange={setPassword}
            passwordHintVisible={!!password.length}
            placeholder="Type your password"
            specialCharacterError={specialCharacterError}
            uppercaseError={uppercaseError}
            value={password}
          />
          <PasswordInput
            autoComplete="off"
            allowToReset={false}
            disabled={loading}
            error={confirmPasswordError}
            jsHandle="js-password-confirmation"
            label="confirm password"
            onChange={setConfirmPassword}
            placeholder="Type your password again"
            value={confirmPassword}
          />
          <Button
            className="mt-6 js-submit-sign-up"
            fill
            loading={loading}
            onClick={submitForm}
          >
            Request Access
          </Button>
        </form>
      </CardPage>
    </>
  );
}
