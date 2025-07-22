import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
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
import FormStatusSelect from "@/components/form/formStatusSelect/formStatusSelect";
import FormInput from "@/components/form/formInput/formInput";
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
        <FormInput
          id="tag"
          label="Etiket"
          error={form.formState.errors.name}
          register={form.register("name")}
        />
      </div>
      <div className="grid gap-3">
        <FormInput
          id="slug"
          label="Slug"
          error={form.formState.errors.slug}
          register={form.register("slug")}
        />
      </div>
      <div className="grid gap-3">
        <FormStatusSelect
          label="Durum"
          name="status"
          status={form.watch("status") as Status}
          setValue={form.setValue}
          trigger={form.trigger}
          error={form.formState.errors.status}
        />
      </div>
      <UpsertButton actionType={actionType} />
    </form>
  );
}
