import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

interface TableRowEmptyProps {
  colSpan: number;
  message: string;
}
export default function TableRowEmpty({
  colSpan,
  message,
}: TableRowEmptyProps) {
  return (
    <tr>
      <td
        className={`inter500 bg-white text-center p-4 rounded-xl text-black`}
        colSpan={colSpan}
      >
        <div className="inline-flex">
          <div className="border-[#C3C5CA] border-[1px] cursor-pointer flex h-7 items-center justify-center rounded-full w-7">
            <FontAwesomeIcon icon={faInfo} aria-label="Info Icon" />
          </div>
          <span className="pl-4 pt-1">{message}</span>
        </div>
      </td>
    </tr>
  );
}
