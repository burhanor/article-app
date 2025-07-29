"use client";

import AdminCrudButton from "@/components/adminCrudButton/admin-crud-button";
import { useModal } from "@/hooks/use-modal";
import UpsertModal from "@/components/modals/upsertModal/upsertModal";
import { GenericDataTable } from "@/components/datatable/generic-datatable";
import { useCrudResource } from "@/hooks/useCrudResource";
import React from "react";
import { IGenericService } from "@/models/types/IGenericService";
import { GenericStore } from "@/stores/genericStore";
import { FieldValues } from "react-hook-form";
import { ColumnDef } from "@tanstack/react-table";

interface GenericCrudPageProps<
  T extends { id: number },
  TFormValues extends FieldValues
> {
  entityName: string;
  store: GenericStore<T>;
  service: IGenericService<T, TFormValues>;
  columns: ColumnDef<T>[];
  FormComponent: React.ComponentType<{ modal: ReturnType<typeof useModal> }>;
  itemLabelKey: keyof T;
}

export function GenericCrudPage<
  T extends { id: number },
  TFormValues extends FieldValues
>({
  entityName,
  store,
  service,
  columns,
  FormComponent,
  itemLabelKey,
}: GenericCrudPageProps<T, TFormValues>) {
  const modal = useModal();

  const { handleCrud, title, rowSelection, setRowSelection } = useCrudResource({
    entityName,
    store,
    service,
    openModal: modal.openModal,
    itemLabelKey,
  });

  return (
    <>
      <AdminCrudButton handleCrud={handleCrud} />
      <UpsertModal modal={modal} title={title}>
        <FormComponent modal={modal} />
      </UpsertModal>
      <div className="mx-auto py-10">
        <GenericDataTable
          columns={columns}
          data={store.items}
          setDatas={store.setSelectedItems}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
      </div>
    </>
  );
}
