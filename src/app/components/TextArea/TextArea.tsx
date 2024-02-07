import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "clsx";

import { useBool } from "../../../hooks/useBool";

export interface TextAreaProps {
  /** Optional class name to apply to root element. */
  className?: string;

  /** When true, textarea cannot be focused or edited. */
  disabled?: boolean;

  /** Error text to display alongside textarea. */
  error?: string;

  /** Label for textarea. */
  label: string;

  /** Callback for when value is changed. */
  onChange: (value: string) => void;

  /** Text that appears in textarea when no value is set. */
  placeholder: string;

  /** When true, value is required. */
  required?: boolean;

  /** Value of textarea. */
  value: string;
}

export function TextArea({
  className,
  disabled = false,
  error,
  label,
  onChange,
  placeholder,
  required,
  value,
}: TextAreaProps) {
  const {
    setFalse: hideRequired,
    setTrue: showRequired,
    value: isRequiredErrorVisible,
  } = useBool(false);
  const showError =
    error || (isRequiredErrorVisible && required && !value.length);

  return (
    <div className={cx("mb-6 w-full", className)}>
      <label className={`uppercase text-xs text-[#525766] inter500`}>
        {label}
      </label>
      <div className="my-2">
        <textarea
          disabled={disabled}
          className={cx(
            "bg-white",
            showError ? "border-[#CA1842]" : "border-[#C3C5CA]",
            "border-[1px]",
            "px-4",
            "py-3",
            "shadow-sm",
            "focus:ring-[#1041ED]",
            "focus:bg-[#E7ECFD]",
            "block",
            "w-full",
            "rounded-3xl",
            "text-[#525766]"
          )}
          name={label}
          id={label}
          placeholder={placeholder}
          required={required}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={showRequired}
          onFocus={hideRequired}
        />
      </div>
      {showError && (
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            color="#CA1842"
            size="xs"
            className="mr-2"
          />
          <span className={`text-[#CA1842] text-xs inter500`}>
            {error || `${label} is required`}
          </span>
        </div>
      )}
    </div>
  );
}
