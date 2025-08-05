import React from "react";
import { Select, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { MenuType } from "@/enums/MenuType";

type Props = {
  menuType: MenuType;
  onChange: (value: MenuType) => void;
};

const MenuTypeSelect = ({ menuType, onChange }: Props) => {
  return (
    <Select
      value={menuType.toString()}
      onValueChange={(val) => onChange(parseInt(val, 10) as MenuType)}
    >
      <SelectTrigger className="app-select">
        <SelectValue placeholder="Menü Tipi Seçin" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={MenuType.Header.toString()}>Header</SelectItem>
        <SelectItem value={MenuType.Footer.toString()}>Footer</SelectItem>
        <SelectItem value={MenuType.Sidebar.toString()}>Sidebar</SelectItem>
        <SelectItem value={MenuType.Custom.toString()}>Özel</SelectItem>
        <SelectItem value={MenuType.Category.toString()}>Kategori</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default MenuTypeSelect;
