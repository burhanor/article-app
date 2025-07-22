"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnMetaType } from "@/models/types/ColumnMetaType";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { MenuItem } from "@/models/MenuItem";
import MenuTypeBadge from "@/components/badges/menu-type-badge";
import { MenuType } from "@/enums/MenuType";

export type CustomColumnDef<TData, TValue = undefined> = ColumnDef<
  TData,
  TValue
> & {
  meta?: ColumnMetaType;
};
export const columns: ColumnDef<MenuItem>[] = [
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
      className: "col-span-10",
      title: "Başlık",
      showHeaderFilter: true,
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return DataTableColumnHeader({
        column,
        title: "Açıklama",
      });
    },
    cell: ({ row }) => <span>{row.getValue("description")}</span>,
    meta: {
      className: "col-span-18",
      title: "Açıklama",
      showHeaderFilter: true,
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "link",
    header: ({ column }) => {
      return DataTableColumnHeader({
        column,
        title: "Link",
      });
    },
    cell: ({ row }) => (
      <span className={`text-${row.getValue("link")}`}>
        {row.getValue("link")}
      </span>
    ),
    meta: {
      className: "col-span-13",
      title: "Link",
      showHeaderFilter: true,
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "displayOrder",
    header: ({ column }) => {
      return DataTableColumnHeader({
        column,
        title: "Sıralama",
      });
    },
    cell: ({ row }) => (
      <span className={`text-${row.getValue("displayOrder")}`}>
        {row.getValue("displayOrder")}
      </span>
    ),
    meta: {
      className: "col-span-3",
      title: "Sıralama",
      showHeaderFilter: true,
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "menuType",
    header: ({ column }) => {
      return DataTableColumnHeader({
        column,
        title: "Menü Tipi",
      });
    },
    cell: ({ row }) => (
      <MenuTypeBadge menuType={row.getValue("menuType") as MenuType} />
    ),
    meta: {
      className: "col-span-5",
      title: "Menü Tipi",
      showHeaderFilter: true,
      enumHeader: true,
    },
    filterFn: (row, id, value) => {
      return value.toString().includes(row.getValue(id));
    },
  },
];
