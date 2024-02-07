interface TableRowLoadingProps {
  colSpan: number;
  message: string;
}
export default function TableRowLoading({
  colSpan,
  message,
}: TableRowLoadingProps) {
  return (
    <tr>
      <td
        className={`inter500 bg-white text-center p-4 rounded-xl text-[#CA1842]`}
        colSpan={colSpan}
      >
        {message}
      </td>
    </tr>
  );
}
