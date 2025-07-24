"use client";
import AdminCrudButton from "@/components/adminCrudButton/admin-crud-button";
import { columns } from "./columns";
import { deleteCategories, fetchCategories } from "@/services/categoryService";
import { useCategoryStore } from "@/stores/categoryStore";
import { useEffect } from "react";

import { useModal } from "@/hooks/use-modal";
import UpsertModal from "@/components/modals/upsertModal/upsertModal";
import CategoryForm from "./categoryForm";
import { GenericDataTable } from "@/components/datatable/generic-datatable";

import { useCrudHandlers } from "@/hooks/useCrudHandlers";

export default function CategoriesPage() {
  const modal = useModal();
  const categoryStore = useCategoryStore();
  useEffect(() => {
    fetchCategories().then(categoryStore.setItems);
  }, []);

  const { handleCrud, title, rowSelection, setRowSelection } = useCrudHandlers({
    entityName: "Kategori",
    store: categoryStore,
    deleteFn: deleteCategories,
    openModal: modal.openModal,
    itemLabelKey: "name",
  });

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
