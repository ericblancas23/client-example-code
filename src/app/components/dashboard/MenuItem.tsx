interface MenuItemProps {
  label: string;
  isLoaded: boolean;
  quantity: number;
  onClick: () => void;
  selected?: boolean;
}

export default function MenuItem({
  label,
  quantity,
  onClick,
  selected,
  isLoaded,
}: MenuItemProps) {
  const selectedStyle = ` text-[#1041ED] border-[#1041ED] `;
  const unselectedStyle = ` text-[#898D9A] border-transparent `;

  return (
    <div
      className={
        `
        flex
        items-center
        justify-between
        py-4
        mx-4
        cursor-pointer
        border-b-4
        hover:border-[#1041ED]
        hover:text-[#1041ED]
      ` + (selected ? selectedStyle : unselectedStyle)
      }
      onClick={onClick}
    >
      <p className={`inter700 text-lg whitespace-nowrap`}>{label}</p>
      {isLoaded && (
        <p
          className={`inter700 ml-2 py-1 px-3 bg-white rounded-3xl text-[#313438] `}
        >
          {" "}
          {quantity}{" "}
        </p>
      )}
    </div>
  );
}
