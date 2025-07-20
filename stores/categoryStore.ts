import { Category } from "@/models/Category";

import { create } from "zustand";
interface CategoryStore {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: number) => void;
  selectedCategories: Category[];
  setSelectedCategories: (categories: Category[]) => void;
}

export const useCategoryStore = create<CategoryStore>()((set) => ({
  categories: [],
  selectedCategories: [],
  setCategories: (categories: Category[]) => set({ categories }),
  addCategory: (category: Category) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),
  updateCategory: (category: Category) =>
    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === category.id ? category : c
      ),
    })),

  deleteCategory: (id: number) =>
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    })),
  setSelectedCategories: (categories: Category[]) =>
    set({ selectedCategories: categories }),
}));
