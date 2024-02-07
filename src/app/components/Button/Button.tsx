import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ButtonHTMLAttributes } from "react";

import type { BaseButtonProps } from "./types";
import { getClassName } from "./utils";

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "style"
> &
  BaseButtonProps;

export function Button({
  children,
  className,
  disabled,
  fill,
  jsHandle,
  large,
  loading,
  noPadding,
  style,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${jsHandle} ${getClassName({
        className,
        disabled,
        fill,
        large,
        loading,
        noPadding,
        style,
      })}`}
      disabled={disabled || loading}
      {...rest}
    >
      <div className={loading ? "invisible" : ""}>{children}</div>
      {loading && (
        <FontAwesomeIcon
          className="absolute"
          icon={faSpinner}
          spin
          color="#fff"
        />
      )}
    </button>
  );
}
