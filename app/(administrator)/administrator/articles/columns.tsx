"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import StatusBadge from "@/components/badges/status-badge";
import { Status } from "@/enums/Status";
import { ColumnMetaType } from "@/models/types/ColumnMetaType";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { ArticleDto } from "@/models/Article";
import { formatDate } from "@/lib/utils";

export type CustomColumnDef<TData, TValue = undefined> = ColumnDef<
  TData,
  TValue
> & {
  meta?: ColumnMetaType;
};
export const columns: ColumnDef<ArticleDto>[] = [
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
    accessorKey: "title",
    header: ({ column }) => {
      return DataTableColumnHeader({
        column,
        title: "Başlık",
      });
    },
    cell: ({ row }) => <span>{row.getValue("title")}</span>,
    meta: {
      className: "col-span-20",
      title: "Başlık",
      showHeaderFilter: true,
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
      className: "col-span-14",
      title: "Slug",
      showHeaderFilter: true,
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "publishDate",
    header: ({ column }) => {
      return DataTableColumnHeader({
        column,
        title: "Yayın Tarihi",
      });
    },
    cell: ({ row }) => <span>{formatDate(row.getValue("publishDate"))}</span>,
    meta: {
      className: "col-span-4",
      title: "Yayın Tarihi",
      showHeaderFilter: true,
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "nickname",
    header: ({ column }) => {
      return DataTableColumnHeader({
        column,
        title: "Kullanıcı",
      });
    },
    cell: ({ row }) => <span>{row.getValue("nickname")}</span>,
    meta: {
      className: "col-span-6",
      title: "Kullanıcı",
      showHeaderFilter: true,
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
      title: "Durum",
      showHeaderFilter: true,
      enumHeader: true,
    },
    filterFn: (row, id, value) => {
      return value.toString().includes(row.getValue(id));
    },
  },
];
