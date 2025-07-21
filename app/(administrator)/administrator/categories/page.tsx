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
import { UpsertCategory } from "./upsertCategory";
import { useModal } from "@/hooks/use-modal";

export default function CategoriesPage() {
  const [rowSelection, setRowSelection] = useState({});
  const modal = useModal();

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
    const selectedCategories = categoryStore.selectedCategories;
    if (selectedCategories.length === 0) {
      Swal.fire({
        title: "Uyarı",
        text: "Güncellemek için bir kategori seçmelisiniz.",
        icon: "warning",
        confirmButtonText: "Tamam",
      });
      return;
    }
    if (selectedCategories.length > 1) {
      Swal.fire({
        title: "Uyarı",
        text: "Aynı anda sadece bir kategoriyi güncelleyebilirsiniz.",
        icon: "warning",
        confirmButtonText: "Tamam",
      });
      return;
    }
    categoryStore.setActionType(ActionTypes.UPDATE);
    modal.openModal();

    // Logic for updating the selected category
    // You can pass the selected category data to the modal if needed
    const categoryToUpdate = selectedCategories[0];
    console.log("Selected Category for Update:", categoryToUpdate);
  }
  function handleAddCategory() {
    categoryStore.setActionType(ActionTypes.ADD);
    modal.openModal();

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
      <UpsertCategory modal={modal} />
      <div className=" mx-auto py-10">
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
