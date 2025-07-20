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
import { useState } from "react";

import { DataTablePagination } from "@/components/datatable/datatable-pagination";
import { ColumnMetaType } from "@/models/types/ColumnMetaType";
import { DataTableFacetedFilter } from "./datatable-faceted-filter";
import { statusOptions } from "@/lib/enumHelper";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];

  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
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
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getFacetedRowModel: getFacetedRowModel(),
    enableRowSelection: true,

    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
    },
  });
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRows = table.getSelectedRowModel().rows;
  console.log("Selected Rows:", selectedRows);

  const names = data.map((item) => ({
    label: item.name,
    value: item.name,
  }));
  const slugs = data.map((item) => ({
    label: item.slug,
    value: item.slug,
  }));

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
          {table.getColumn("name") && (
            <DataTableFacetedFilter
              column={table.getColumn("name")}
              title="Name"
              options={names}
            />
          )}
          {table.getColumn("slug") && (
            <DataTableFacetedFilter
              column={table.getColumn("slug")}
              title="Slug"
              options={slugs}
            />
          )}
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statusOptions}
            />
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
