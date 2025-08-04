import { createGenericService } from "./genericService";
import { Category } from "@/models/Category";
import { CategoryFormValues } from "@/schemas/categorySchema";
import apiClient from "./client";
import { CategoryDto } from "@/models/CategoryDto";
import { PaginationContainer } from "@/models/types/PaginationContainer";
import { Status } from "@/enums/Status";

const categoryService = createGenericService<Category, CategoryFormValues>(
  "/category"
);

export default categoryService;

export async function categoryExists(
  slug: string,
  activeControl: boolean = true
): Promise<boolean> {
  try {
    const response = await apiClient.get<PaginationContainer<CategoryDto>>(
      `/category`,
      {
        params: {
          slug,
        },
      }
    );
    if (activeControl) {
      return response.data.items[0]?.status === Status.Published;
    }
    return response.data.totalCount > 0;
  } catch (error) {
    console.error("Kategori kontrolü sırasında bir hata oluştu:", error);
    return false;
  }
}
