"use client";
import AdminCrudButton from "@/components/adminCrudButton/admin-crud-button";
import { columns } from "./columns";
import { deleteCategories, fetchCategories } from "@/services/categoryService";
import { useCategoryStore } from "@/stores/categoryStore";
import { useEffect, useState } from "react";
import { ActionTypes } from "@/enums/ActionTypes";
import { ResponseStatus } from "@/enums/ResponseStatus";
import { useModal } from "@/hooks/use-modal";
import UpsertModal from "@/components/modals/upsertModal/upsertModal";
import CategoryForm from "./categoryForm";
import { GenericDataTable } from "@/components/datatable/generic-datatable";
import {
  confirmDeleteDialog,
  showError,
  showSuccess,
  showWarning,
} from "@/lib/swalHelper";

export default function CategoriesPage() {
  const [rowSelection, setRowSelection] = useState({});
  const modal = useModal();
  const [title, setTitle] = useState("Kategori İşlemleri");
  const categoryStore = useCategoryStore();
  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories();
      categoryStore.setItems(categories);
    };
    fetchData();
  }, []);

  const handleDeleteCategory = async () => {
    const selectedCategories = categoryStore.selectedItems;
    if (selectedCategories.length === 0) {
      showWarning("Silmek için en az bir kategori seçmelisiniz.");
      return;
    }
    const categoryIds = selectedCategories.map((category) => category.id);
    const confirmed = await confirmDeleteDialog(selectedCategories, {
      title: "Kategorileri Sil",
    });
    if (confirmed) {
      const response = await deleteCategories(categoryIds);
      if (response.status === ResponseStatus.Success) {
        showSuccess("Kategoriler başarıyla silindi.");
        categoryStore.deleteItem(categoryIds);
        setRowSelection({});
      } else {
        showError(
          response.message || "Kategoriler silinirken bir hata oluştu."
        );
      }
    }
  };

  function handleUpdateCategory() {
    const selectedCategories = categoryStore.selectedItems;
    if (selectedCategories.length === 0) {
      showWarning("Güncellemek için bir kategori seçmelisiniz.");
      return;
    }
    if (selectedCategories.length > 1) {
      showWarning("Aynı anda sadece bir kategoriyi güncelleyebilirsiniz.");
      return;
    }
    categoryStore.setActionType(ActionTypes.UPDATE);
    modal.openModal();
  }
  function handleAddCategory() {
    categoryStore.setActionType(ActionTypes.ADD);
    modal.openModal();
  }

  async function handleCrud(action: ActionTypes) {
    switch (action) {
      case ActionTypes.ADD:
        handleAddCategory();
        setTitle("Kategori Ekle");
        break;
      case ActionTypes.UPDATE:
        handleUpdateCategory();
        setTitle("Kategori Güncelle");
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
      <UpsertModal modal={modal} title={title}>
        <CategoryForm modal={modal} />
      </UpsertModal>
      <div className=" mx-auto py-10">
        <GenericDataTable
          columns={columns}
          data={categoryStore.items}
          setDatas={categoryStore.setSelectedItems}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
      </div>
    </>
  );
}
