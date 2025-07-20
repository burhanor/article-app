"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "@/models/Category";
import StatusBadge from "@/components/badges/status-badge";
import { Status } from "@/enums/Status";
import { ColumnMetaType } from "@/models/types/ColumnMetaType";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";

export type CustomColumnDef<TData, TValue = undefined> = ColumnDef<
  TData,
  TValue
> & {
  meta?: ColumnMetaType;
};
export const columns: ColumnDef<Category>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: "col-span-1",
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return DataTableColumnHeader({
        column,
        title: "Name",
      });
    },
    cell: ({ row }) => <span>{row.getValue("name")}</span>,
    meta: {
      className: "col-span-22",
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "slug",
    header: ({ column }) => {
      return DataTableColumnHeader({
        column,
        title: "Slug",
      });
    },
    cell: ({ row }) => (
      <span className={`text-${row.getValue("slug")}`}>
        {row.getValue("slug")}
      </span>
    ),
    meta: {
      className: "col-span-22",
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return DataTableColumnHeader({
        column,
        title: "Durum",
      });
    },
    cell: ({ row }) => (
      <StatusBadge status={row.getValue("status") as Status} />
    ),
    meta: {
      className: "col-span-5",
    },
    filterFn: (row, id, value) => {
      return value.toString().includes(row.getValue(id));
    },
  },
];
