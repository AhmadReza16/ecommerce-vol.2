type Column<T> = {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
};

export default function Table<T extends { id: number }>({
  data,
  columns,
}: {
  data: T[];
  columns: Column<T>[];
}) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)} className="border p-2">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.isArray(data) &&
          data.map((row) => (
            <tr key={row.id} className="border-t">
              {columns.map((col) => (
                <td key={String(col.key)} className="p-2">
                  {col.render ? col.render(row) : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}
