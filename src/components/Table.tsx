import React from "react";
import { type SortOrder, cn } from "~/utils/helpers";
import { LoadingSpinner } from "./LoadingSpinner";

export type TableColumn<T> = {
  title: string;
  key: keyof T;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface Props<T> {
  rows: T[] | undefined;
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
  onSort: (key: keyof T, sortOrder: SortOrder) => void;
  loading?: boolean;
  currentSortBy: keyof T;
  currentSortOrder: SortOrder;
  defaultSortBy: keyof T;
  defaultSortOrder: SortOrder;
}

export function TableLayout<T>(props: Props<T>) {

  const onSort = (column: TableColumn<T>) => {
    const shouldResetOrder = props.currentSortOrder === "desc" && props.currentSortBy === column.key;

    if (shouldResetOrder) {
      props.onSort(props.defaultSortBy, props.defaultSortOrder);
      return;
    }

    const newSortOrder = props.currentSortBy === column.key ? "desc" : "asc";
    props.onSort(column.key, newSortOrder);
  }

  return (
    <div className="w-full">
      <table className="w-full" data-testid="table">
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
                    onSort(column);
                  }
                }}
                style={{
                  width: column.width,
                }}
                data-testid={`table-column-${index + 1}`}
              >
                <div className={cn(
                  "flex items-center",
                  column.sortable ? "cursor-pointer" : "",
                )}>
                  {column.title}
                  {column.sortable && props.currentSortBy === column.key && (
                    <img
                      src={props.currentSortOrder === "asc" ? "/sort-asc.svg" : "/sort-desc.svg"}
                      alt="sort"
                      className={cn(
                        "w-[20px] h-[20px] ml-5",
                      )}
                      data-testid={`sort-icon-${props.currentSortOrder}`}
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
              data-testid={`table-row-${index + 1}`}
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