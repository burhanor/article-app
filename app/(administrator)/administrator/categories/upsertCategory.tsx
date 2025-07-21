"use client";
import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { useCategoryStore } from "@/stores/categoryStore";
import { ActionTypes } from "@/enums/ActionTypes";
import CategoryForm from "./categoryForm";

export function UpsertCategory({
  modal,
}: {
  modal: ReturnType<typeof useModal>;
}) {
  const { actionType } = useCategoryStore();
  const { open, setOpen } = modal;

  const preventClose = React.useCallback((e: Event) => e.preventDefault(), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onEscapeKeyDown={preventClose}
        onPointerDownOutside={preventClose}
      >
        <DialogHeader>
          <DialogTitle>
            {actionType === ActionTypes.ADD
              ? "Kategori Ekle"
              : "Kategori Güncelle"}
          </DialogTitle>
        </DialogHeader>
        <CategoryForm modal={modal} />
      </DialogContent>
    </Dialog>
  );
}
