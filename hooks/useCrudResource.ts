import { useEffect } from "react";
import { useCrudHandlers } from "./useCrudHandlers";
import { GenericStore } from "@/stores/genericStore";
import { IGenericService } from "@/models/types/IGenericService";
import { FieldValues } from "react-hook-form";

interface CrudResourceOptions<
  T extends { id: number },
  TFormValues extends FieldValues
> {
  entityName: string;
  store: GenericStore<T>;
  service: IGenericService<T, TFormValues>;
  openModal: () => void;
  itemLabelKey: keyof T;
}

export function useCrudResource<
  T extends { id: number },
  TFormValues extends FieldValues
>(options: CrudResourceOptions<T, TFormValues>) {
  const { store, service, entityName, openModal, itemLabelKey } = options;

  useEffect(() => {
    service.fetchAll().then(store.setItems);
  }, []);

  const { handleCrud, rowSelection, setRowSelection, title } = useCrudHandlers({
    entityName,
    store,
    deleteFn: service.delete,
    openModal,
    itemLabelKey,
  });

  return {
    handleCrud,
    rowSelection,
    setRowSelection,
    title,
  };
}
