"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import { DataTablePagination } from "@/components/datatable/datatable-pagination";
import { ColumnMetaType } from "@/models/types/ColumnMetaType";
import { statusOptions } from "@/lib/enumHelper";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DataTableFacetedFilter } from "./datatable-faceted-filter";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setDatas: (data: TData[]) => void;
  rowSelection: Record<string, boolean>;
  onRowSelectionChange: (
    updater: React.SetStateAction<Record<string, boolean>>
  ) => void;
}

export function GenericDataTable<TData, TValue>({
  columns,
  data,
  setDatas,
  rowSelection,
  onRowSelectionChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: onRowSelectionChange,
    onGlobalFilterChange: setGlobalFilter,
    getFacetedRowModel: getFacetedRowModel(),
    enableRowSelection: true,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
    },
    autoResetPageIndex: false,
    autoResetAll: false,
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRows = table.getSelectedRowModel().rows;

  useEffect(() => {
    const selectedData = selectedRows.map((row) => row.original);
    setDatas(selectedData);
  }, [selectedRows, setDatas, table]);
  const getUniqueOptions = <K extends keyof TData>(key: K) => {
    const uniqueValues = Array.from(new Set(data.map((item) => item[key])));
    return uniqueValues.map((value) => ({
      label: String(value),
      value: String(value),
    }));
  };

  return (
    <div className="rounded-md border">
      <div className="flex items-center py-4 ps-6 justify-start">
        <Input
          placeholder="Ara..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-60 transition-all duration-200 focus:ring-2 focus:ring-primary focus:border-primary rounded-md shadow-sm"
        />
        <div className="flex gap-2 ml-auto pe-2">
          {table
            .getAllLeafColumns()
            .filter(
              (column) =>
                (column.columnDef.meta as ColumnMetaType)?.showHeaderFilter
            )
            .map((column) =>
              column.getIsVisible() ? (
                <DataTableFacetedFilter
                  key={column.id}
                  column={column}
                  title={
                    (column.columnDef.meta as ColumnMetaType)?.title ??
                    column.id.charAt(0).toUpperCase() + column.id.slice(1)
                  }
                  options={
                    column.id === "status"
                      ? statusOptions
                      : getUniqueOptions(column.id as keyof TData)
                  }
                />
              ) : null
            )}

          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.resetColumnFilters()}
            >
              Reset
              <X />
            </Button>
          )}
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="grid grid-cols-50 ">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={`content-center ${
                      (header.column.columnDef.meta as ColumnMetaType)
                        ?.className ?? ""
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="grid grid-cols-50"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={` ${
                      (cell.column.columnDef.meta as ColumnMetaType).className
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}
