import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";

import { SidebarModal } from "../SidebarModal/SidebarModal";
import type { Item } from "../SidebarModal/types";
import { useState } from "react";
import type {
  Location,
  LocationsResponse,
  RolesResponse,
  Role,
} from "@syelo/api";
import type { UseQueryResult } from "react-query";

interface SelectGroupProps {
  active: boolean;
  toggleActive: () => void;
  label: string;
  modalTitle: string;
  searchPlaceholder?: string;
  query: UseQueryResult<LocationsResponse | RolesResponse>;
  selectIds: (ids: string[]) => void;
  leftAlignPx: string;
}

export function SelectGroup({
  active,
  toggleActive,
  label,
  modalTitle,
  searchPlaceholder,
  query,
  selectIds,
  leftAlignPx,
}: SelectGroupProps) {
  const selectedClassNames = " bg-[#E7ECFD] text-[#1041ED] border-[#1041ED] ";
  const unselectedClassNames = " bg-white text-[#525766] border-[#C3C5CA] ";
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const items: Item[] =
    query?.data?.data.map(({ id, name }: Location | Role) => ({
      id: id,
      name: name,
      checked: selectedIds.includes(id),
    })) || [];

  const onToggleItem = ({ id }: Item) => {
    let newIds: string[];
    if (selectedIds.includes(id)) {
      newIds = selectedIds.filter((itemId) => itemId !== id);
    } else {
      newIds = [...selectedIds, id];
    }

    setSelectedIds(newIds);
    selectIds(newIds);
  };

  return (
    <div>
      <label className={`uppercase text-xs text-[#525766] inter500`}>
        {label}
      </label>
      <div
        onClick={() => toggleActive()}
        className={
          `
          flex
          justify-between
          cursor-pointer
          items-center
          my-2
          border-[1px]
          px-4
          py-3
          shadow-sm
          focus:ring-[#1041ED]
          focus:bg-[#E7ECFD]
          w-full
          rounded-[3.875em]
        ` + (active ? selectedClassNames : unselectedClassNames)
        }
      >
        {modalTitle}
        <FontAwesomeIcon
          icon={faChevronRight}
          color={active ? "#1041ED" : "#525766"}
        />
      </div>
      <div className="flex flex-wrap">
        {items
          .filter(({ checked }: Item) => checked)
          .map((item: Item) => (
            <div
              key={item.id}
              className={`
              px-4
              py-2
              bg-white
              rounded-[3.875em]
              text-[#1041ED]
              text-xs
              mr-2
              mb-2`}
            >
              {item.name}

              <FontAwesomeIcon
                icon={faTimes}
                className="ml-2"
                color="#1041ED"
                onClick={() => onToggleItem(item)}
              />
            </div>
          ))}
      </div>
      {active && (
        <SidebarModal
          leftAlignPx={leftAlignPx}
          title={modalTitle}
          onClose={toggleActive}
          items={items}
          onToggleItem={onToggleItem}
          searchPlaceholder={searchPlaceholder}
        />
      )}
    </div>
  );
}
