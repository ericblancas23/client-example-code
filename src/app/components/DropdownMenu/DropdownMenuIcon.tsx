import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

interface DropdownMenuIconProps {
  faIcon: IconProp;
  size: "small" | "medium";
}

export function DropdownMenuIcon({ faIcon, size }: DropdownMenuIconProps) {
  return (
    <button
      className={`${
        size === "small" ? "h-7 w-7" : "h-10 w-10"
      } bg-white border border-[#C3C5CA] text-[#525766] text-center cursor-pointer rounded-full uppercase z-0 hover:bg-[#E7ECFD]`}
    >
      <FontAwesomeIcon icon={faIcon} />
    </button>
  );
}
