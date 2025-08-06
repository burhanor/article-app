import { MenuType } from "@/enums/MenuType";
import { MenuItem } from "../MenuItem";

export const defaultMenuItem: MenuItem = {
  id: 0,
  title: "",
  description: "",
  link: "",
  menuType: MenuType.Header,
  displayOrder: 1,
};
