"use client";

import clsx from "clsx";

export interface Column<T> {
  key: keyof T | "actions";
  label: string;
  render?: (value: any, row?: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor?: (item: T) => any;
  loading?: boolean;
}

export default function Table<T>({
  data,
  columns,
  keyExtractor,
  loading = false,
}: TableProps<T>) {
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading data...</div>
    );
  }

  if (!data || data.length === 0) {
    return <div className="text-center py-10 text-gray-500">No data found</div>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-3 text-sm font-medium text-gray-700"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => (
            <tr
              key={keyExtractor ? keyExtractor(row) : idx}
              className={clsx(
                "border-t",
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              )}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-2 text-sm">
                  {col.render
                    ? col.render((row as any)[col.key as keyof T], row)
                    : (row[col.key as keyof T] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
