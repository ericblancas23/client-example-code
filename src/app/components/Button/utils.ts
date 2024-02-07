import cx from "clsx";

import type { BaseButtonProps } from "./types";
import { ButtonStyle } from "./types";

interface GetClassNameProps
  extends Pick<BaseButtonProps, "fill" | "large" | "noPadding" | "style"> {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function getClassName({
  className,
  disabled,
  fill,
  large,
  loading,
  noPadding,
  style = ButtonStyle.PRIMARY,
}: GetClassNameProps) {
  const isDisabled = disabled || loading;

  return cx(
    className,
    style === ButtonStyle.PRIMARY ? "bg-[#1041ED]" : "bg-white",
    "border",
    style === ButtonStyle.TERTIARY ? "border-[#C3C5CA]" : "border-[#1041ED]",
    isDisabled ? "cursor-default" : "cursor-pointer",
    "inter600",
    "inline-flex",
    "items-center",
    "justify-center",
    "leading-4",
    "rounded-[4.214289em]",
    "text-sm",
    "tracking-[0.08em]",
    "uppercase",
    {
      "hover:bg-[#0A278F]": !isDisabled,
      "hover:border-[#0A278F]": !isDisabled,
      "hover:text-white": !isDisabled,
      "opacity-50": isDisabled,
      "px-6": !noPadding,
      "py-[0.6875rem]": !noPadding && !large,
      "py-4": !noPadding && large,
      "text-[#1041ED]": style === ButtonStyle.SECONDARY,
      "text-[#525766]": style === ButtonStyle.TERTIARY,
      "text-white": style === ButtonStyle.PRIMARY,
      "w-full": fill,
    }
  );
}
