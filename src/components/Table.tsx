import React from "react";
import { cn } from "~/utils/helpers";

export type TableColumn<T> = {
  title: string;
  key?: keyof T;
  render?: (row: T) => React.ReactNode;
}

interface Props<T> {
  rows: T[] | undefined;
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
}

export function TableLayout<T>(props: Props<T>) {

  return (
    <table className="w-full">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          {props.columns.map((column, index) => (
            <th key={index} className="text-left px-6 py-3">
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows?.map((row: T, index: number) => (
          <tr
            key={index}
            className={cn(
              "bg-white border-b hover:bg-gray-50 cursor-pointer",
            )}
            onClick={() => props.onRowClick?.(row)}
          >
            {props.columns.map((column, index) => (
              <td
                key={index}
                className="border-t border-solid border-[#E7EAEC] px-6 py-4"
              >
                {column.render ? column.render(row) : (column.key ? row[column.key] : "") as React.ReactElement}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}