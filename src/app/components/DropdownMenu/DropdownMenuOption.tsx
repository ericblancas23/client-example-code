import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface DropdownMenuOptionProps {
  faIcon: IconProp;
  message: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  destructive?: boolean;
}

export function DropdownMenuOption({
  faIcon,
  message,
  destructive,
  onClick,
}: DropdownMenuOptionProps) {
  return (
    <button
      className={`rounded-xl p-2 ${
        destructive ? "hover:bg-[#FAE8EC]" : "hover:bg-[#E7ECFD]"
      } flex items-center justify-start`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faIcon} aria-label={message} />
      <span className="pl-4">{message}</span>
    </button>
  );
}
