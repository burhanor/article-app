import { MenuItem } from "@/models/MenuItem";
import apiClient from "./client";
import { ResponseStatus } from "@/enums/ResponseStatus";
import { ResponseContainer, Unit } from "@/models/types/ResponseContainer";
import { MenuItemFormValues } from "@/schemas/menuItemSchema";

export async function fetchMenuItems(): Promise<MenuItem[]> {
  try {
    const response = await apiClient.get("/menu");
    console.log("Menüler:", response.data);
    return response.data.items as MenuItem[];
  } catch (error) {
    console.error("Menüler alınırken bir hata oluştu:", error);
    return [];
  }
}

export async function deleteMenuItems(
  menuItemIds: number[]
): Promise<ResponseContainer<Unit>> {
  try {
    const response = await apiClient.delete("/menu", {
      data: menuItemIds,
    });
    return response.data as ResponseContainer<Unit>;
  } catch (error) {
    console.error("Menüler silinirken bir hata oluştu:", error);
  }
  return {
    status: ResponseStatus.Failed,
    message: "Menüler silinirken bir hata oluştu.",
  } as ResponseContainer<Unit>;
}

export async function addMenuItem(
  menuItem: MenuItemFormValues
): Promise<ResponseContainer<MenuItem>> {
  try {
    const response = await apiClient.post("/menu", menuItem);
    return response.data as ResponseContainer<MenuItem>;
  } catch (error) {
    console.error("Menü eklenirken bir hata oluştu:", error);
    return {
      status: ResponseStatus.Failed,
      message: "Menü eklenirken bir hata oluştu.",
    } as ResponseContainer<MenuItem>;
  }
}
export async function updateMenuItem(
  menuItem: MenuItemFormValues
): Promise<ResponseContainer<MenuItem>> {
  try {
    const response = await apiClient.put(`/menu/${menuItem.id}`, menuItem);
    return response.data as ResponseContainer<MenuItem>;
  } catch (error) {
    console.error("Menü güncellenirken bir hata oluştu:", error);
    return {
      status: ResponseStatus.Failed,
      message: "Menü güncellenirken bir hata oluştu.",
    } as ResponseContainer<MenuItem>;
  }
}
