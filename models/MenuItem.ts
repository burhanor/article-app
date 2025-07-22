import { MenuType } from "@/enums/MenuType";

export interface MenuItem {
  id: number;
  title: string;
  description: string;
  link: string;
  menuType: MenuType;
  displayOrder: number;
}
