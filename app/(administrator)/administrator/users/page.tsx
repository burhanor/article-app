"use client";
import AdminCrudButton from "@/components/adminCrudButton/admin-crud-button";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { useModal } from "@/hooks/use-modal";
import UpsertModal from "@/components/modals/upsertModal/upsertModal";
import { GenericDataTable } from "@/components/datatable/generic-datatable";

import { useCrudHandlers } from "@/hooks/useCrudHandlers";
import UserForm from "./userForm";
import { useUserStore } from "@/stores/userStore";
import { deleteUsers, fetchUsers } from "@/services/userService";

export default function UsersPage() {
  const [rowSelection, setRowSelection] = useState({});
  const modal = useModal();
  const userStore = useUserStore();

  useEffect(() => {
    fetchUsers().then(userStore.setItems);
  }, []);
  const { handleCrud, title } = useCrudHandlers({
    entityName: "Kullanıcı",
    store: userStore,
    deleteFn: deleteUsers,
    openModal: modal.openModal,
    itemLabelKey: "nickname",
  });

  return (
    <>
      <AdminCrudButton handleCrud={handleCrud} />
      <UpsertModal modal={modal} title={title}>
        <UserForm modal={modal} />
      </UpsertModal>
      <div className=" mx-auto py-10">
        <GenericDataTable
          columns={columns}
          data={userStore.items}
          setDatas={userStore.setSelectedItems}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
      </div>
    </>
  );
}
