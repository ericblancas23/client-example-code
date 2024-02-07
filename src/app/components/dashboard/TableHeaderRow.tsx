import type { HeaderDeclaration } from "../../../pages/dashboard";

interface TableHeaderRowProps {
  headers: HeaderDeclaration[];
}
export default function TableHeaderRow({ headers }: TableHeaderRowProps) {
  return (
    <tr className="js-table-headers mb-2 text-[#525766] uppercase w-full whitespace-nowrap">
      {headers.map(({ label, key, colSpan }, index) => {
        return (
          <th
            key={key}
            className={`inter500 bg-white leading-3 ${
              index === 0 ? " p-4 rounded-l-xl" : "p-2"
            } ${
              index === headers.length - 1 ? "rounded-r-xl" : ""
            } text-left col-span-${colSpan || "1"}`}
          >
            {label}
          </th>
        );
      })}
    </tr>
  );
}
