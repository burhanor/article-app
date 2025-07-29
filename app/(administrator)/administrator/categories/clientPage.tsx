"use client";
import { columns } from "./columns";
import { useCategoryStore } from "@/stores/categoryStore";
import categoryService from "@/services/categoryService";
import { GenericCrudPage } from "@/components/administrator/genericCrudPage/genericCrudPage";
import CategoryForm from "./categoryForm";

export default function ClientPage() {
  const categoryStore = useCategoryStore();
  return (
    <GenericCrudPage
      entityName="Kategori"
      store={categoryStore}
      service={categoryService}
      columns={columns}
      FormComponent={CategoryForm}
      itemLabelKey="name"
    />
  );
}
