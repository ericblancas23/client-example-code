import { Button } from "../Button/Button";
import { ButtonStyle } from "../Button/types";

export interface TableDataActionButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  resourceId?: string;
}

export function TableDataActionButton({
  label,
  onClick,
  resourceId,
}: TableDataActionButtonProps) {
  return (
    <div>
      <Button
        className={`
                  border-[2px]
                  hover:border-[#1041ED]
                  bg-white
                  hover:bg-white
                  border-[#C3C5CA]
                `}
        fill={false}
        style={ButtonStyle.TERTIARY}
        onClick={onClick}
        data-resource-id={resourceId}
      >
        <span className={`cursor-pointer text-[#525766] inter400`}>
          {label}
        </span>
      </Button>
    </div>
  );
}
