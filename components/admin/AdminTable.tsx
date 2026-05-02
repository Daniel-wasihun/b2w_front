import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface AdminTableProps<T> {
  columns: Array<{
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
  }>;
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  renderActions?: (row: T) => React.ReactNode;
  onRowClick?: (row: T) => void;
  enableSelection?: boolean;
  selectedRows?: Set<string | number>;
  onSelectionChange?: (selected: Set<string | number>) => void;
  selectionKey?: keyof T;
}

export function AdminTable<T>({
  columns,
  data,
  loading = false,
  emptyMessage = "No data available",
  renderActions,
  onRowClick,
  enableSelection = false,
  selectedRows = new Set(),
  onSelectionChange,
  selectionKey = "id" as keyof T,
}: AdminTableProps<T>) {
  const handleRowClick = (row: T) => {
    if (onRowClick) {
      onRowClick(row);
    }
    if (enableSelection) {
      const key = row[selectionKey] as any;
      const newSelectedRows = new Set(selectedRows);
      if (newSelectedRows.has(key)) {
        newSelectedRows.delete(key);
      } else {
        newSelectedRows.add(key);
      }
      onSelectionChange?.(newSelectedRows);
    }
  };

  if (loading) {
    return (
      <Table>
        <TableBody>
          {Array(5).fill(0).map((_, i) => (
            <TableRow key={i} className="border-border">
              <TableCell colSpan={columns.length} className="px-6 py-4">
                <Skeleton className="h-8 w-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (data.length === 0) {
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={columns.length} className="px-6 py-8 text-center text-muted-foreground">
              {emptyMessage}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader className="bg-muted/50">
        <TableRow className="border-border">
          {columns.map((col, index) => (
            <TableHead
              key={index}
              className={cn("pl-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground h-11", col.className)}
            >
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => {
          const isSelected = enableSelection && selectedRows.has(row[selectionKey] as any);
          return (
            <TableRow
              key={rowIndex}
              className={cn(
                "border-border hover:bg-muted/50 transition-colors cursor-pointer",
                isSelected && "bg-primary/5"
              )}
              onClick={() => handleRowClick(row)}
            >
              {columns.map((col, colIndex) => {
                const cellValue =
                  typeof col.accessor === "function"
                    ? col.accessor(row)
                    : (row[col.accessor] as any);
                return (
                  <TableCell
                    key={colIndex}
                    className={cn(
                      "px-6 py-4 text-[11px] font-medium text-foreground",
                      isSelected && "font-bold",
                      col.className
                    )}
                  >
                    {enableSelection && colIndex === 0 ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            e.stopPropagation();
                            const key = row[selectionKey] as any;
                            const newSelectedRows = new Set(selectedRows);
                            if (e.target.checked) {
                              newSelectedRows.add(key);
                            } else {
                              newSelectedRows.delete(key);
                            }
                            onSelectionChange?.(newSelectedRows);
                          }}
                          className="h-4 w-4 accent-primary rounded"
                        />
                        {cellValue}
                      </div>
                    ) : (
                      cellValue
                    )}
                  </TableCell>
                );
              })}
              {renderActions ? (
                <TableCell className="pr-6 text-right py-4">
                  {renderActions(row)}
                </TableCell>
              ) : null}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}