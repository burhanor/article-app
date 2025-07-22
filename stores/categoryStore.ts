import { Category } from "@/models/Category";
import { createGenericStore } from "./genericStore";

export const useCategoryStore = createGenericStore<Category>();
