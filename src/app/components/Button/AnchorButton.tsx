import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { LinkProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import type { BaseButtonProps } from "./types";
import { getClassName } from "./utils";

export interface AnchorButtonProps
  extends Omit<LinkProps, "style">,
    BaseButtonProps {
  disabled?: boolean;
}

export function AnchorButton({
  children,
  className,
  disabled,
  fill,
  large,
  loading,
  noPadding,
  onClick,
  style,
  jsHandle,
  ...rest
}: AnchorButtonProps) {
  const click = useCallback<Required<AnchorButtonProps>["onClick"]>(
    (e) => {
      if (disabled || loading) {
        e.preventDefault();
      } else {
        onClick?.(e);
      }
    },
    [disabled, loading, onClick]
  );

  return (
    <Link
      className={`${jsHandle} ${getClassName({
        className,
        disabled,
        fill,
        large,
        loading,
        noPadding,
        style,
      })}`}
      onClick={click}
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
    </Link>
  );
}
