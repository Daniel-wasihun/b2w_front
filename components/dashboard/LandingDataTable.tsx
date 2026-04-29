"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit2, Trash2, Plus, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface Column {
  header: string;
  accessor: string;
  render?: (value: any, item: any) => React.ReactNode;
  className?: string;
}

interface LandingDataTableProps {
  title: string;
  subtitle?: string;
  columns: Column[];
  data: any[];
  loading: boolean;
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
  onCreate: () => void;
  createLabel?: string;
  searchPlaceholder?: string;
}

export const LandingDataTable = ({
  title,
  subtitle,
  columns,
  data,
  loading,
  onEdit,
  onDelete,
  onCreate,
  createLabel = "Add New",
  searchPlaceholder = "Search..."
}: LandingDataTableProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(item =>
      Object.values(item).some(val => {
        if (val === null || val === undefined) return false;
        const stringVal = typeof val === 'object' ? JSON.stringify(val) : String(val);
        return stringVal.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm]);

  return (
    <div className="space-y-4">
      {/* Search & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-sm w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm outline-none focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
          />
        </div>

        <Button onClick={onCreate} className="h-10 px-6 font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4 mr-2" />
          {createLabel}
        </Button>
      </div>

      {/* Premium White Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-colors duration-300">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent border-border h-12">
              {columns.map((col, i) => (
                <TableHead key={i} className={cn("text-[10px] font-black uppercase tracking-widest text-muted-foreground px-6 h-12", col.className)}>
                  {col.header}
                </TableHead>
              ))}
              <TableHead className="text-right pr-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Registry Control</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(5).fill(0).map((_, i) => (
                <TableRow key={`skeleton-${i}`} className="border-border/50">
                  {columns.map((_, j) => (
                    <TableCell key={j} className="px-6 py-4"><Skeleton className="h-10 w-full rounded-md" /></TableCell>
                  ))}
                  <TableCell className="pr-6 text-right"><Skeleton className="h-10 w-24 ml-auto rounded-md" /></TableCell>
                </TableRow>
              ))
            ) : filteredData.length > 0 ? (
              filteredData.map((item, i) => (
                <TableRow
                  key={item.id || i}
                  className="border-border/50 hover:bg-muted/30 transition-colors"
                >
                  {columns.map((col, j) => (
                    <TableCell key={j} className={cn("px-6 py-4 text-sm font-medium text-foreground/80", col.className)}>
                      {col.render ? col.render(item[col.accessor], item) : item[col.accessor]}
                    </TableCell>
                  ))}
                  <TableCell className="pr-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                        onClick={() => onEdit(item)}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all"
                        onClick={() => onDelete(item.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                  No records found in the stack.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
