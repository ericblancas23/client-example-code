import {
  faCheckCircle,
  faChevronRight,
  faExclamationCircle,
  faEye,
  faEyeSlash,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "clsx";
import { Link } from "react-router-dom";
import type { InputHTMLAttributes } from "react";
import { useCallback } from "react";
import { useBool } from "../../../hooks/useBool";

interface PasswordInputProps {
  /** When true, will show forgot password link. */
  allowToReset?: boolean;

  /** Optional class name to apply to root element. */
  className?: string;

  /** When true, input cannot be focused or edited. */
  disabled?: boolean;

  /** Error text to display alongside input. */
  error?: string;

  /** Label for input. */
  label: string;

  /** Callback for when value is changed. */
  onChange: (value: string) => void;

  /** When true, will show password hint. */
  passwordHintVisible?: boolean;

  /** Text that appears in input when no value is set. */
  placeholder: string;

  /** Value of input. */
  value: string;

  /** autocomplete to satisfy React + Dom */
  autoComplete: boolean | string;

  /** optional handle for js */
  jsHandle?: string;

  /** optional to specify a required field */
  required?: boolean;

  // TODO: Remove these and have the component compute this? Seems odd to have consumer inform the component about when
  // these are errors when the component itself specifies the rules such as how many characters a password must be.
  lengthError?: boolean;
  numberError?: boolean;
  specialCharacterError?: boolean;
  uppercaseError?: boolean;
}

export function PasswordInput({
  allowToReset = true,
  className,
  disabled = false,
  error,
  label,
  lengthError,
  numberError,
  onChange,
  passwordHintVisible,
  placeholder,
  specialCharacterError,
  uppercaseError,
  value,
  required,
  jsHandle,
}: PasswordInputProps) {
  const {
    setFalse: hideRequired,
    setTrue: showRequired,
    value: isRequiredErrorVisible,
  } = useBool(false);
  const { toggle, value: visible } = useBool(false);
  const change = useCallback<
    Required<InputHTMLAttributes<HTMLInputElement>>["onChange"]
  >((e) => onChange(e.target.value), [onChange]);
  const showError =
    error || (isRequiredErrorVisible && required && !value.length);

  return (
    <div className={cx("mb-6 w-full", className)}>
      <div className="flex justify-between">
        <label className={`text-[#525766] text-xs uppercase inter500`}>
          {label}
        </label>
        {allowToReset && (
          <Link to="/forgot-password">
            <div className="cursor-pointer flex items-center">
              <span className={`text-[#525766] text-xs inter400`}>
                Forgot password
              </span>
              <FontAwesomeIcon
                className="ml-1"
                color="#525766"
                icon={faChevronRight}
                size="xs"
              />
            </div>
          </Link>
        )}
      </div>
      <div className="my-2 flex items-center">
        <input type="hidden" name="username" />
        <input
          className={cx(
            "bg-white",
            "block",
            showError ? "border-[#CA1842]" : "border-[#C3C5CA]",
            "border-[1px]",
            "focus:bg-[#E7ECFD]",
            "focus:ring-[#1041ED]",
            "px-4",
            "py-3",
            "rounded-[3.875em]",
            "shadow-sm",
            "text-[#525766]",
            "w-full",
            jsHandle
          )}
          disabled={disabled}
          id={label}
          name={label}
          placeholder={placeholder}
          type={visible ? "text" : "password"}
          value={value}
          onChange={change}
          onBlur={showRequired}
          onFocus={hideRequired}
          autoComplete={"new-password"}
        />
        <FontAwesomeIcon
          color="#525766"
          className="cursor-pointer -ml-8"
          icon={visible ? faEye : faEyeSlash}
          onClick={toggle}
        />
      </div>
      {passwordHintVisible && (
        <div className="bg-[#DADBDE] p-6 rounded-3xl whitespace-nowrap">
          <div className={`mb-4 text-[#525766] text-xs leading-3 inter600`}>
            Password must include:
          </div>
          <ul>
            <li
              className={`flex gap-2 items-center mb-1 text-[#525766] text-xs inter500`}
            >
              <FontAwesomeIcon
                color={lengthError ? "#CA1842" : "#11B78F"}
                icon={lengthError ? faXmarkCircle : faCheckCircle}
                size="xs"
              />
              <span>At least 8 characters</span>
            </li>
            <li
              className={`flex gap-2 items-center mb-1 text-[#525766] text-xs inter500`}
            >
              <FontAwesomeIcon
                color={uppercaseError ? "#CA1842" : "#11B78F"}
                icon={uppercaseError ? faXmarkCircle : faCheckCircle}
                size="xs"
              />
              <span>At least 1 uppercase letter</span>
            </li>
            <li
              className={`flex gap-2 items-center mb-1 text-[#525766] text-xs inter500`}
            >
              <FontAwesomeIcon
                color={numberError ? "#CA1842" : "#11B78F"}
                icon={numberError ? faXmarkCircle : faCheckCircle}
                size="xs"
              />
              <span>At least 1 number</span>
            </li>
            <li
              className={`flex gap-2 items-center mb-1 text-[#525766] text-xs inter500`}
            >
              <FontAwesomeIcon
                color={specialCharacterError ? "#CA1842" : "#11B78F"}
                icon={specialCharacterError ? faXmarkCircle : faCheckCircle}
                size="xs"
              />
              <span>At least 1 special character</span>
            </li>
          </ul>
        </div>
      )}
      {showError && (
        <div className="flex items-center">
          <FontAwesomeIcon
            className="mr-2"
            color="#CA1842"
            icon={faExclamationCircle}
            size="xs"
          />
          <span className={`text-[#CA1842] text-xs inter500 ${jsHandle}-error`}>
            {error || `${label} is required`}
          </span>
        </div>
      )}
    </div>
  );
}
