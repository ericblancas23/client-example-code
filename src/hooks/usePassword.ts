import { useCallback, useState } from "react";

/**
 * React hook that maintains a password and it's validation state.
 *
 * @returns object containing "password", "setPassword" callback, as well as validation error attributes.
 */
export function usePassword() {
  const [lengthError, setLengthError] = useState(true);
  const [numberError, setNumberError] = useState(true);
  const [password, setPassword] = useState("");
  const [specialCharacterError, setSpecialCharacterError] = useState(true);
  const [uppercaseError, setUppercaseError] = useState(true);

  return {
    lengthError,
    uppercaseError,
    numberError,
    password,
    setPassword: useCallback((newPassword: string) => {
      setLengthError(newPassword.length < 8);
      setNumberError(!/[0-9]/.test(newPassword));
      setPassword(newPassword);
      setSpecialCharacterError(!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword));
      setUppercaseError(!/[A-Z]/.test(newPassword));
    }, []),
    specialCharacterError,
  };
}
