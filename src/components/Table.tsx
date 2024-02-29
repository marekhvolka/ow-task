import React from "react";
import { SortOrder, cn } from "~/utils/helpers";
import { LoadingSpinner } from "./LoadingSpinner";

export type TableColumn<T> = {
  title: string;
  key: keyof T;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  sortActive?: boolean;
  sortOrder?: SortOrder;
  width?: string;
}

interface Props<T> {
  rows: T[] | undefined;
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
  onSort: (column: TableColumn<T>) => void;
  loading?: boolean;
}

export function TableLayout<T>(props: Props<T>) {

  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {props.columns.map((column, index) => (
              <th
                key={index}
                className={cn(
                  "text-left px-6 py-3",
                )}
                onClick={() => {
                  if (column.sortable) {
                    props.onSort(column);
                  }
                }}
                style={{
                  width: column.width,
                }}
              >
                <div className={cn(
                  "flex items-center",
                  column.sortable ? "cursor-pointer" : "",
                )}>
                  {column.title}
                  {column.sortable && column.sortActive && (
                    <img
                      src={column.sortOrder === "asc" ? "/sort-asc.svg" : "/sort-desc.svg"}
                      alt="sort"
                      className={cn(
                        "w-[20px] h-[20px] ml-5",
                      )}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!props.loading && props.rows?.map((row: T, index: number) => (
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
      {props.loading && (
        <LoadingSpinner />
      )}
    </div>
  )
}