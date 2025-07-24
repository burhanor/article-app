import { ActionTypes } from "@/enums/ActionTypes";
import { ResponseStatus } from "@/enums/ResponseStatus";
import {
  confirmDeleteDialog,
  showError,
  showSuccess,
  showWarning,
} from "@/lib/swalHelper";
import { useState } from "react";

interface CrudHandlersOptions<T> {
  entityName: string;
  store: {
    selectedItems: T[];
    deleteItem: (ids: number[]) => void;
    setActionType: (type: ActionTypes) => void;

    setSelectedItems: (items: T[]) => void;
  };
  deleteFn: (
    ids: number[]
  ) => Promise<{ status: ResponseStatus; message?: string }>;
  openModal: () => void;
  itemLabelKey: keyof T;
}

export function useCrudHandlers<T extends { id: number }>({
  entityName,
  store,
  deleteFn,
  openModal,
  itemLabelKey,
}: CrudHandlersOptions<T>) {
  const [title, setTitle] = useState("Kategori İşlemleri");

  const [rowSelection, setRowSelection] = useState({});
  const handleDelete = async () => {
    const selectedItems = store.selectedItems;
    if (selectedItems.length === 0) {
      showWarning(
        `Silmek için en az bir ${entityName.toLowerCase()} seçmelisiniz.`
      );
      return;
    }

    const ids = selectedItems.map((item) => item.id);
    const confirmed = await confirmDeleteDialog(selectedItems, {
      itemLabelKey: itemLabelKey,
      title: `${entityName}leri Sil`,
    });

    if (confirmed) {
      const response = await deleteFn(ids);
      if (response.status === ResponseStatus.Success) {
        showSuccess(`${entityName}ler başarıyla silindi.`);
        store.deleteItem(ids);
        setRowSelection({});
      } else {
        showError(
          response.message || `${entityName}ler silinirken bir hata oluştu.`
        );
      }
    }
  };

  const handleUpdate = () => {
    const selectedItems = store.selectedItems;
    if (selectedItems.length === 0) {
      showWarning(
        `Güncellemek için bir ${entityName.toLowerCase()} seçmelisiniz.`
      );
      return;
    }
    if (selectedItems.length > 1) {
      showWarning(
        `Aynı anda sadece bir ${entityName.toLowerCase()} güncelleyebilirsiniz.`
      );
      return;
    }
    store.setActionType(ActionTypes.UPDATE);
    openModal();
    setTitle(`${entityName} Güncelle`);
  };

  const handleAdd = () => {
    store.setActionType(ActionTypes.ADD);
    openModal();
    setTitle(`${entityName} Ekle`);
  };

  const handleCrud = async (action: ActionTypes) => {
    switch (action) {
      case ActionTypes.ADD:
        handleAdd();
        break;
      case ActionTypes.UPDATE:
        handleUpdate();
        break;
      case ActionTypes.DELETE:
        await handleDelete();
        break;
    }
  };

  return {
    rowSelection,
    setRowSelection,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleCrud,
    title,
  };
}
