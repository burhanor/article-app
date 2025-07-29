import { createGenericService } from "./genericService";
import { Category } from "@/models/Category";
import { CategoryFormValues } from "@/schemas/categorySchema";

const categoryService = createGenericService<Category, CategoryFormValues>(
  "/category"
);

export default categoryService;
