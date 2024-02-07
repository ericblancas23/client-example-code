import type { InputProps } from "../Input/Input.tsx";
import { Input } from "../Input/Input.tsx";
import { useState } from "react";
import { isValidEmail, isValidUrl } from "../../helpers/format-helpers.ts";

export enum ValidationType {
  url = "url",
  email = "email",
}

export interface ValidatedInputProps
  extends Omit<InputProps, "onChange" | "error"> {
  setValue: (value: string) => void;
  setBackendError?: (value: string) => void;
  errorText: string;
  backendError?: string;
  validationType: ValidationType;
}

export function ValidatedInput({
  setValue,
  errorText,
  validationType,
  backendError,
  setBackendError,
  value,
  ...rest
}: ValidatedInputProps) {
  const [error, setError] = useState("");

  const validateAndSetValue = (val: string) => {
    setValue(val);

    // If the value has changed since we hit the server
    if (val && val !== value && setBackendError) {
      // Clear out the backend error after the value has changed at least once
      setBackendError("");
    }

    if (backendError) {
      return;
    }

    if (
      (validationType === ValidationType.url && isValidUrl(val)) ||
      (validationType === ValidationType.email && isValidEmail(val))
    ) {
      setError("");
    } else {
      setError(errorText);
    }
  };

  return (
    <Input
      onChange={validateAndSetValue}
      error={error || backendError}
      value={value}
      {...rest}
    />
  );
}
