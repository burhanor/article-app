//https://localhost:5007/api/category

import { Category } from "@/models/Category";
import apiClient from "./client";

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
