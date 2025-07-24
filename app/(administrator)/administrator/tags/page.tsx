"use client";
import AdminCrudButton from "@/components/adminCrudButton/admin-crud-button";
import { columns } from "./columns";
import { deleteTags, fetchTags } from "@/services/tagService";
import { useTagStore } from "@/stores/tagStore";
import { useEffect } from "react";
import { useModal } from "@/hooks/use-modal";
import UpsertModal from "@/components/modals/upsertModal/upsertModal";
import TagForm from "./tagForm";
import { GenericDataTable } from "@/components/datatable/generic-datatable";

import { useCrudHandlers } from "@/hooks/useCrudHandlers";

export default function TagsPage() {
  const modal = useModal();
  const tagStore = useTagStore();

  useEffect(() => {
    fetchTags().then(tagStore.setItems);
  }, []);
  const { handleCrud, title, rowSelection, setRowSelection } = useCrudHandlers({
    entityName: "Etiket",
    store: tagStore,
    deleteFn: deleteTags,
    openModal: modal.openModal,
    itemLabelKey: "name",
  });

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
