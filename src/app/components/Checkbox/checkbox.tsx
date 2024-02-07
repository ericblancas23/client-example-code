import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import type { ReactNode } from "react";

export interface CheckboxProps {
  /** Callback for when value is changed. */
  onChange: (value: boolean) => void;

  /** Value of input. */
  value: boolean;

  /** Text to trigger error state **/
  error?: string;
  name: string;
  children: ReactNode;
}

export function Checkbox({
  onChange,
  value,
  error,
  name,
  children,
}: CheckboxProps) {
  return (
    <div className="flex flex-col mb-6">
      <div className="text-xs">
        <input
          checked={value}
          className="mr-2 text-red-400 bg-yellow-200 align-middle"
          name={name}
          type="checkbox"
          onChange={(elem: React.ChangeEvent<HTMLInputElement>) =>
            onChange(elem.target.checked)
          }
        />
        <label
          className={`text-[#525766] inter500 align-middle`}
          htmlFor={name}
        >
          {children}
        </label>
      </div>
      {error && (
        <div className="flex items-center">
          <FontAwesomeIcon
            className="mr-2"
            color="#CA1842"
            icon={faExclamationCircle}
            size="xs"
          />
          <span className={`text-[#CA1842] text-xs inter500`}>{error}</span>
        </div>
      )}
    </div>
  );
}
