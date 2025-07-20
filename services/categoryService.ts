//https://localhost:5007/api/category

import { Category } from "@/models/Category";
import apiClient from "./client";
import { ResponseStatus } from "@/enums/ResponseStatus";
import { ResponseContainer, Unit } from "@/models/types/ResponseContainer";

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await apiClient.get("/category");
    console.log("Kategoriler:", response.data);
    return response.data.items as Category[];
  } catch (error) {
    console.error("Kategoriler alınırken bir hata oluştu:", error);
    return [];
  }
}

export async function deleteCategories(
  categoryIds: number[]
): Promise<ResponseContainer<Unit>> {
  try {
    const response = await apiClient.delete("/category", {
      data: categoryIds,
    });
    return response.data as ResponseContainer<Unit>;
  } catch (error) {
    console.error("Kategoriler silinirken bir hata oluştu:", error);
  }
  return {
    status: ResponseStatus.Failed,
    message: "Kategoriler silinirken bir hata oluştu.",
  } as ResponseContainer<Unit>;
}
