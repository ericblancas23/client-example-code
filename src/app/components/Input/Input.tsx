import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "clsx";
import type { InputHTMLAttributes, ReactNode } from "react";
import { useCallback } from "react";
import { useBool } from "../../../hooks/useBool";

export interface InputProps {
  /** Optional action to put above right side of input. */
  action?: ReactNode;

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

  /** Text that appears in input when no value is set. */
  placeholder: string;

  /** When true, value is required. */
  required?: boolean;

  /** Value of input. */
  value: string;

  /** autoComplete to satisft React + DOM */
  autoComplete?: string;

  /** optional handle to grab the input in tests **/
  jsHandle?: string;
}

export function Input({
  action,
  className,
  disabled = false,
  error,
  label,
  onChange,
  placeholder,
  required,
  value,
  autoComplete,
  jsHandle,
}: InputProps) {
  const {
    setFalse: hideRequired,
    setTrue: showRequired,
    value: isRequiredErrorVisible,
  } = useBool(false);
  const change = useCallback<
    Required<InputHTMLAttributes<HTMLInputElement>>["onChange"]
  >((e) => onChange(e.target.value), [onChange]);
  const showError =
    error || (isRequiredErrorVisible && required && !value.length);

  return (
    <div className={cx("mb-6 w-full", className)}>
      <label className={`flex text-[#525766] text-xs uppercase inter500`}>
        {label}
        {action && <div className="flex flex-1 justify-end">{action}</div>}
      </label>
      <div className="my-2">
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
          required={required}
          type="text"
          value={value}
          onChange={change}
          onBlur={showRequired}
          onFocus={hideRequired}
          autoComplete={autoComplete || "off"}
        />
      </div>
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
