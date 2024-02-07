import type { ReactNode } from "react";

interface DropdownMenuProps {
  dropdownMenuIcon: ReactNode;
  children: ReactNode[];
}

export function DropdownMenu({
  dropdownMenuIcon,
  children,
}: DropdownMenuProps) {
  return (
    <div
      className={`js-dropdown-menu group relative whitespace-nowrap text-[#525766]`}
    >
      {dropdownMenuIcon}
      <div className="hidden group-hover:block absolute right-0 w-[17rem] z-10 pt-1 cursor-pointer">
        <div className="border-2 grid grid-cols-1 gap-1 rounded-xl bg-white p-1">
          {children}
        </div>
      </div>
    </div>
  );
}
