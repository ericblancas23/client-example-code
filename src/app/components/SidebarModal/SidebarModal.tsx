import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { SideBarItem } from "./SideBarItem";
import type { Item } from "./types";

interface SidebarModalProps {
  title: string;
  onClose: () => void;
  items?: Item[];
  onToggleItem: (item: Item) => void;
  searchPlaceholder?: string;
  leftAlignPx: string;
}

export function SidebarModal({
  title,
  onClose,
  items,
  onToggleItem,
  searchPlaceholder,
  leftAlignPx,
}: SidebarModalProps) {
  const [search, setSearch] = useState<string>("");

  return (
    <div
      className={`bg-white w-[390px] absolute left-[${leftAlignPx}] top-[73px] bottom-0 border-[#D0D0D0] border-[1px] overflow-auto overscroll-contain`}
    >
      <div className="flex flex-col">
        <div className="sticky top-0 bg-white">
          <div className="m-6 flex justify-between">
            <span className={`text-2xl flex-1 text-[#525766] inter700`}>
              {title}
            </span>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={onClose}
              size="2x"
              color="#525766"
            />
          </div>

          <div className="bg-[#EAEAEC] p-2">
            <input
              className={`
            bg-white
            border-[#C3C5CA]
            border-[1px]
            px-4
            py-3
            shadow-sm
            focus:ring-[#1041ED]
              focus:bg-[#E7ECFD]
            block
            w-full
            rounded-[3.875em]
            text-[#525766]
          `}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              type="text"
            />
          </div>
        </div>

        <div className="flex flex-col p-4">
          {items
            ?.filter((item: Item) =>
              search.length > 0
                ? item.name
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
                : true
            )
            .map((item: Item) => (
              <SideBarItem
                key={item.id}
                name={item.name}
                checked={item.checked}
                onClick={() => onToggleItem(item)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
