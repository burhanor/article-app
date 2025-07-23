"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnMetaType } from "@/models/types/ColumnMetaType";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { User } from "@/models/User";
import UserTypeBadge from "@/components/badges/user-type-badge";
import { UserType } from "@/enums/UserType";
import DataTableImage from "@/components/datatable/datatable-image";
import { Square, SquareCheck } from "lucide-react";

export type CustomColumnDef<TData, TValue = undefined> = ColumnDef<
  TData,
  TValue
> & {
  meta?: ColumnMetaType;
};
export const columns: ColumnDef<User>[] = [
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
      <div className="flex items-center h-full">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: "col-span-1",
    },
  },
  {
    accessorKey: "avatarPath",
    header: ({ column }) => {
      return DataTableColumnHeader({
        column,
        title: "Avatar",
      });
    },
    cell: ({ row }) => (
      <div className="flex items-center h-full">
        <DataTableImage imageUrl={row.getValue("avatarPath")} />
      </div>
    ),
    meta: {
      className: "col-span-3",
      title: "Avatar",
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
        title: "Kullanıcı Adı",
      });
    },
    cell: ({ row }) => (
      <span className="flex items-center h-full">
        {row.getValue("nickname")}
      </span>
    ),
    meta: {
      className: "col-span-20",
      title: "Kullanıcı Adı",
      showHeaderFilter: true,
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "emailAddress",
    header: ({ column }) => {
      return DataTableColumnHeader({
        column,
        title: "E-posta Adresi",
      });
    },
    cell: ({ row }) => (
      <span className="flex items-center h-full">
        {row.getValue("emailAddress")}
      </span>
    ),
    meta: {
      className: "col-span-18",
      title: "E-posta Adresi",
      showHeaderFilter: true,
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return DataTableColumnHeader({
        column,
        title: "Aktif",
      });
    },
    cell: ({ row }) => (
      <div className="flex items-center h-full">
        {row.getValue("isActive") ? <SquareCheck /> : <Square />}
      </div>
    ),
    meta: {
      className: "col-span-3",
      title: "Aktif",
      showHeaderFilter: true,
      enumHeader: true,
    },
    filterFn: (row, id, value) => {
      return value.toString().includes(row.getValue(id));
    },
  },
  {
    accessorKey: "userType",
    header: ({ column }) => {
      return DataTableColumnHeader({
        column,
        title: "Kullanıcı Tipi",
      });
    },
    cell: ({ row }) => (
      <div className="flex items-center h-full">
        <UserTypeBadge userType={row.getValue("userType") as UserType} />
      </div>
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
