import { createGenericService } from "./genericService";
import { MenuItem } from "@/models/MenuItem";
import { MenuItemFormValues } from "@/schemas/menuItemSchema";
import apiClient from "./client";
import { MenuType } from "@/enums/MenuType";
import { PaginationContainer } from "@/models/types/PaginationContainer";

const menuService = createGenericService<MenuItem, MenuItemFormValues>("/menu");

export default menuService;

export async function getMenuItemsByType(
  menuType: MenuType
): Promise<MenuItem[]> {
  try {
    const response = await apiClient.get<PaginationContainer<MenuItem>>(
      `/menu?menuType=${menuType}`
    );
    return response.data.items;
  } catch (error) {
    console.error("Menu items alınırken bir hata oluştu:", error);
    return [];
  }
}
