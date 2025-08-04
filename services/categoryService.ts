import { createGenericService } from "./genericService";
import { Category } from "@/models/Category";
import { CategoryFormValues } from "@/schemas/categorySchema";
import apiClient from "./client";

const categoryService = createGenericService<Category, CategoryFormValues>(
  "/category"
);

export default categoryService;

export async function categoryIsExist(slug: string): Promise<boolean> {
  const response = await apiClient.get<boolean>(
    `/category/${encodeURIComponent(slug)}/exist`
  );
  console.log("Category existence check:", response.data);
  return response.data;
}
