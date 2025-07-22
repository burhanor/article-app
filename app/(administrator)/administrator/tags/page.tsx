"use client";
import AdminCrudButton from "@/components/adminCrudButton/admin-crud-button";
import { columns } from "./columns";
import { deleteTags, fetchTags } from "@/services/tagService";
import { useTagStore } from "@/stores/tagStore";
import { useEffect, useState } from "react";
import { ActionTypes } from "@/enums/ActionTypes";
import { ResponseStatus } from "@/enums/ResponseStatus";
import { useModal } from "@/hooks/use-modal";
import UpsertModal from "@/components/modals/upsertModal/upsertModal";
import TagForm from "./tagForm";
import { GenericDataTable } from "@/components/datatable/generic-datatable";
import {
  confirmDeleteDialog,
  showError,
  showSuccess,
  showWarning,
} from "@/lib/swalHelper";

export default function TagsPage() {
  const [rowSelection, setRowSelection] = useState({});
  const modal = useModal();
  const [title, setTitle] = useState("Etiket İşlemleri");
  const tagStore = useTagStore();
  useEffect(() => {
    const fetchData = async () => {
      const tags = await fetchTags();
      tagStore.setItems(tags);
    };
    fetchData();
  }, []);

  const handleDeleteTag = async () => {
    const selectedCategories = tagStore.selectedItems;
    if (selectedCategories.length === 0) {
      showWarning("Silmek için en az bir etiket seçmelisiniz.");
      return;
    }
    const tagIds = selectedCategories.map((tag) => tag.id);
    const confirmed = await confirmDeleteDialog(selectedCategories, {
      title: "Etiketleri Sil",
    });
    if (confirmed) {
      const response = await deleteTags(tagIds);
      if (response.status === ResponseStatus.Success) {
        showSuccess("Etiketler başarıyla silindi.");
        tagStore.deleteItem(tagIds);
        setRowSelection({});
      } else {
        showError(response.message || "Etiketler silinirken bir hata oluştu.");
      }
    }
  };

  function handleUpdateTag() {
    const selectedCategories = tagStore.selectedItems;
    if (selectedCategories.length === 0) {
      showWarning("Güncellemek için bir etiket seçmelisiniz.");
      return;
    }
    if (selectedCategories.length > 1) {
      showWarning("Aynı anda sadece bir etiketi güncelleyebilirsiniz.");
      return;
    }
    tagStore.setActionType(ActionTypes.UPDATE);
    modal.openModal();
  }
  function handleAddTag() {
    tagStore.setActionType(ActionTypes.ADD);
    modal.openModal();
  }

  async function handleCrud(action: ActionTypes) {
    switch (action) {
      case ActionTypes.ADD:
        handleAddTag();
        setTitle("Etiket Ekle");
        break;
      case ActionTypes.UPDATE:
        handleUpdateTag();
        setTitle("Etiket Güncelle");
        break;
      case ActionTypes.DELETE:
        await handleDeleteTag();
        break;
      default:
        break;
    }
  }

  return (
    <>
      <AdminCrudButton handleCrud={handleCrud} />
      <UpsertModal modal={modal} title={title}>
        <TagForm modal={modal} />
      </UpsertModal>
      <div className=" mx-auto py-10">
        <GenericDataTable
          columns={columns}
          data={tagStore.items}
          setDatas={tagStore.setSelectedItems}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
      </div>
    </>
  );
}
