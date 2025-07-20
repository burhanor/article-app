"use client";
import AdminCrudButton from "@/components/adminCrudButton/admin-crud-button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { deleteCategories, fetchCategories } from "@/services/categoryService";
import { useCategoryStore } from "@/stores/categoryStore";
import { useEffect, useState } from "react";
import { ActionTypes } from "@/enums/ActionTypes";
import Swal from "sweetalert2";
import { ResponseStatus } from "@/enums/ResponseStatus";

export default function CategoriesPage() {
  const [rowSelection, setRowSelection] = useState({});

  const categoryStore = useCategoryStore();
  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories();
      categoryStore.setCategories(categories);
    };
    fetchData();
  }, []);

  const handleDeleteCategory = async () => {
    const selectedCategories = categoryStore.selectedCategories;
    if (selectedCategories.length === 0) {
      Swal.fire({
        title: "Uyarı",
        text: "Silmek için en az bir kategori seçmelisiniz.",
        icon: "warning",
        confirmButtonText: "Tamam",
      });
      return;
    }
    const categoryIds = selectedCategories.map((category) => category.id);

    const htmlText = `
      <div style="max-height: 220px; overflow-y: auto;">
      ${selectedCategories
        .map((category) => `<div class="font-bold">${category.name}</div>`)
        .join("")}
      </div>
    `;

    const result = await Swal.fire({
      title: "Onay",
      html: `Seçilen kategorileri silmek istediğinize emin misiniz? <br> ${htmlText}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet, sil",
      cancelButtonText: "Hayır, iptal et",
    });

    if (result.isConfirmed) {
      const response = await deleteCategories(categoryIds);
      if (response.status === ResponseStatus.Success) {
        Swal.fire({
          title: "Başarılı",
          text: "Kategoriler başarıyla silindi.",
          icon: "success",
          confirmButtonText: "Tamam",
        });
        categoryStore.deleteCategory(categoryIds);
        setRowSelection({});
      } else {
        Swal.fire({
          title: "Hata",
          text: response.message || "Kategoriler silinirken bir hata oluştu.",
          icon: "error",
          confirmButtonText: "Tamam",
        });
      }
    }
  };

  function handleUpdateCategory() {
    alert("Kategori güncelleme işlemi henüz uygulanmadı.");
    // Logic for updating a category
  }
  function handleAddCategory() {
    alert("Kategori ekleme işlemi henüz uygulanmadı.");
    // Logic for adding a new category
  }

  async function handleCrud(action: ActionTypes) {
    switch (action) {
      case ActionTypes.ADD:
        handleAddCategory();
        break;
      case ActionTypes.UPDATE:
        handleUpdateCategory();
        break;
      case ActionTypes.DELETE:
        await handleDeleteCategory();
        break;
      default:
        break;
    }
  }

  return (
    <>
      <AdminCrudButton handleCrud={handleCrud} />
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={categoryStore.categories}
          setSelectedCategories={categoryStore.setSelectedCategories}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
      </div>
    </>
  );
}
