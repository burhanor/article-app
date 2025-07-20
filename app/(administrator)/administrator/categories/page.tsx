"use client";
import AdminCrudButton from "@/components/adminCrudButton/admin-crud-button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { fetchCategories } from "@/services/categoryService";
import { useCategoryStore } from "@/stores/categoryStore";
import { useEffect } from "react";
import { ActionTypes } from "@/enums/ActionTypes";
import Swal from "sweetalert2";

export default function CategoriesPage() {
  const categoryStore = useCategoryStore();
  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories();
      categoryStore.setCategories(categories);
    };
    fetchData();
  }, []);

  function handleDeleteCategory() {
    Swal.fire({
      title: "Merhaba!",
      text: "Bu bir SweetAlert uyarısıdır.",
      icon: "success",
      confirmButtonText: "Tamam",
    });
  }

  function handleUpdateCategory() {
    alert("Kategori güncelleme işlemi henüz uygulanmadı.");
    // Logic for updating a category
  }
  function handleAddCategory() {
    alert("Kategori ekleme işlemi henüz uygulanmadı.");
    // Logic for adding a new category
  }

  function handleCrud(action: ActionTypes) {
    switch (action) {
      case ActionTypes.ADD:
        handleAddCategory();
        break;
      case ActionTypes.UPDATE:
        handleUpdateCategory();
        break;
      case ActionTypes.DELETE:
        handleDeleteCategory();
        break;
      default:
        break;
    }
  }

  return (
    <>
      <AdminCrudButton handleCrud={handleCrud} />
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={categoryStore.categories} />
      </div>
    </>
  );
}
