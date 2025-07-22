import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import React from "react";

export default function UpsertModal({
  modal,
  children,
  title,
}: {
  modal: ReturnType<typeof useModal>;
  children: React.ReactNode;
  title: string;
}) {
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
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
