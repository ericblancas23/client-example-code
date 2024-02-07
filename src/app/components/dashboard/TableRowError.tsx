import type { ReactNode } from "react";

interface TableRowErrorProps {
  colSpan: number;
  message: string;
  children?: ReactNode;
}
export default function TableRowError({
  colSpan,
  message,
  children,
}: TableRowErrorProps) {
  return (
    <tr>
      <td
        className={`inter500 bg-white text-center p-4 rounded-xl text-[#CA1842]`}
        colSpan={colSpan}
      >
        {message}
        {children}
      </td>
    </tr>
  );
}
