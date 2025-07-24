"use client";
import AdminCrudButton from "@/components/adminCrudButton/admin-crud-button";
import { columns } from "./columns";
import { useEffect } from "react";

import { useModal } from "@/hooks/use-modal";
import UpsertModal from "@/components/modals/upsertModal/upsertModal";
import MenuForm from "./menuForm";
import { GenericDataTable } from "@/components/datatable/generic-datatable";

import { useCrudHandlers } from "@/hooks/useCrudHandlers";
import { deleteMenuItems, fetchMenuItems } from "@/services/menuItemService";
import { useMenuStore } from "@/stores/menuStore";
import { menuTypeOptions } from "@/lib/enumHelper";

export default function MenuPage() {
  const modal = useModal();
  const menuStore = useMenuStore();
  useEffect(() => {
    fetchMenuItems().then(menuStore.setItems);
  }, []);

  const { handleCrud, title, rowSelection, setRowSelection } = useCrudHandlers({
    entityName: "Menü",
    store: menuStore,
    deleteFn: deleteMenuItems,
    openModal: modal.openModal,
    itemLabelKey: "title",
  });

  return (
    <>
      <AdminCrudButton handleCrud={handleCrud} />
      <UpsertModal modal={modal} title={title}>
        <MenuForm modal={modal} />
      </UpsertModal>
      <div className=" mx-auto py-10">
        <GenericDataTable
          columns={columns}
          data={menuStore.items}
          setDatas={menuStore.setSelectedItems}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          enumOptions={menuTypeOptions}
        />
      </div>
    </>
  );
}
