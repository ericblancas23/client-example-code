interface SideBarItemProps {
  name: string;
  checked: boolean;
  onClick: () => void;
}

export function SideBarItem({ name, checked, onClick }: SideBarItemProps) {
  return (
    <div
      className="flex p-2 bg-white hover:bg-[#E7ECFD] rounded-lg items-center"
      onClick={onClick}
    >
      <input
        type="checkbox"
        className="mr-4"
        checked={checked}
        onChange={(checked) => !checked}
      />
      <span className={checked ? "text-[#1041ED]" : "text-[#525766]"}>
        {name}
      </span>
    </div>
  );
}
