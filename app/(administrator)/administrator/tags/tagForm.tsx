import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StatusSelect from "@/components/selects/status-select";
import { UpsertButton } from "@/components/buttons/upsertButton";

import { useModal } from "@/hooks/use-modal";
import { useTagStore } from "@/stores/tagStore";

import { Tag } from "@/models/Tag";
import { tagSchema, TagFormValues } from "@/schemas/tagSchema";
import { ActionTypes } from "@/enums/ActionTypes";
import { ResponseStatus } from "@/enums/ResponseStatus";
import { handleValidationErrors } from "@/lib/validationHelper";

import {
  addTag as addTagApi,
  updateTag as updateTagApi,
} from "@/services/tagService";
import { Status } from "@/enums/Status";
import { showSuccess } from "@/lib/swalHelper";
import ErrorMessage from "@/components/errorMessage/errorMessage";
const defaultItem: Tag = {
  name: "",
  slug: "",
  status: Status.Pending,
  id: 0,
};
export default function TagForm({
  className,
  modal,
}: {
  className?: string;
  modal: ReturnType<typeof useModal>;
}) {
  const { selectedItems, actionType, addItem, updateItem } = useTagStore();

  const selectedItem =
    actionType === ActionTypes.UPDATE
      ? selectedItems[0] || defaultItem
      : defaultItem;

  const form = useForm<TagFormValues>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: selectedItem.name || "",
      slug: selectedItem.slug || "",
      status: selectedItem.status || Status.Pending,
    },
  });

  const onSubmit = async (data: TagFormValues) => {
    try {
      if (actionType === ActionTypes.ADD) {
        const response = await addTagApi(data);

        if (response.status === ResponseStatus.Success) {
          showSuccess("Etiket başarıyla eklendi.");
          addItem(response.data as Tag);
          modal.closeModal();
        } else if (response.status === ResponseStatus.ValidationError) {
          handleValidationErrors(form, response.validationErrors);
        } else {
          toast.error(response.message || "Etiket eklenirken bir hata oluştu.");
        }
      } else if (actionType === ActionTypes.UPDATE) {
        data.id = selectedItem.id;
        const response = await updateTagApi(data);

        if (response.status === ResponseStatus.Success) {
          showSuccess("Etiket güncellendi.");
          updateItem(response.data as Tag);
          modal.closeModal();
        } else if (response.status === ResponseStatus.ValidationError) {
          handleValidationErrors(form, response.validationErrors);
        } else {
          toast.error(
            response.message || "Etiket güncellenirken bir hata oluştu."
          );
        }
      }
    } catch {
      toast.error("Sunucuya bağlanırken bir hata oluştu.");
    }
  };

  return (
    <form
      className={cn("grid items-start gap-6", className)}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="grid gap-3">
        <Label htmlFor="tag">Etiket</Label>
        <Input type="text" id="tag" {...form.register("name")} />
        <ErrorMessage message={form.formState.errors.name?.message} />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="slug">Slug</Label>
        <Input type="text" id="slug" {...form.register("slug")} />
        <ErrorMessage message={form.formState.errors.slug?.message} />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="status">Durum</Label>
        <StatusSelect
          status={form.watch("status") as Status}
          onChange={(val) => {
            form.setValue("status", val);
            form.trigger("status");
          }}
        />
        <ErrorMessage message={form.formState.errors.status?.message} />
      </div>

      <UpsertButton actionType={actionType} />
    </form>
  );
}
