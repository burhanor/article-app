import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { UpsertButton } from "@/components/buttons/upsertButton";

import { useModal } from "@/hooks/use-modal";
import { useCategoryStore } from "@/stores/categoryStore";

import { Category } from "@/models/Category";
import { categorySchema, CategoryFormValues } from "@/schemas/categorySchema";
import { ActionTypes } from "@/enums/ActionTypes";

import { Status } from "@/enums/Status";
import FormInput from "@/components/form/formInput/formInput";
import FormStatusSelect from "@/components/form/formStatusSelect/formStatusSelect";
import { handleFormSubmit } from "@/lib/formHelper";
import categoryService from "@/services/categoryService";
const defaultItem: Category = {
  name: "",
  slug: "",
  status: Status.Pending,
  id: 0,
};
export default function CategoryForm({
  className,
  modal,
}: {
  className?: string;
  modal: ReturnType<typeof useModal>;
}) {
  const { selectedItems, actionType, addItem, updateItem } = useCategoryStore();

  const selectedItem =
    actionType === ActionTypes.UPDATE
      ? selectedItems[0] || defaultItem
      : defaultItem;

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: selectedItem.name || "",
      slug: selectedItem.slug || "",
      status: selectedItem.status || Status.Pending,
    },
  });

  //   try {
  //     if (actionType === ActionTypes.ADD) {
  //       const response = await addCategoryApi(data);

  //       if (response.status === ResponseStatus.Success) {
  //         showSuccess("Kategori başarıyla eklendi.");
  //         addItem(response.data as Category);
  //         modal.closeModal();
  //       } else if (response.status === ResponseStatus.ValidationError) {
  //         handleValidationErrors(form, response.validationErrors);
  //       } else {
  //         toast.error(
  //           response.message || "Kategori eklenirken bir hata oluştu."
  //         );
  //       }
  //     } else if (actionType === ActionTypes.UPDATE) {
  //       data.id = selectedItem.id;
  //       const response = await updateCategoryApi(data);

  //       if (response.status === ResponseStatus.Success) {
  //         showSuccess("Kategori güncellendi.");
  //         updateItem(response.data as Category);
  //         modal.closeModal();
  //       } else if (response.status === ResponseStatus.ValidationError) {
  //         handleValidationErrors(form, response.validationErrors);
  //       } else {
  //         toast.error(
  //           response.message || "Kategori güncellenirken bir hata oluştu."
  //         );
  //       }
  //     }
  //   } catch {
  //     toast.error("Sunucuya bağlanırken bir hata oluştu.");
  //   }
  // };

  const onSubmit = async (data: CategoryFormValues) => {
    await handleFormSubmit<Category, CategoryFormValues>({
      data,
      actionType,
      selectedItem,
      addApi: categoryService.add,
      updateApi: categoryService.update,
      onSuccess: (result) => {
        if (actionType === ActionTypes.ADD) {
          addItem(result);
        } else {
          updateItem(result);
        }
        return;
      },
      form,
      modal,
      messages: {
        add: "Kategori başarıyla eklendi.",
        update: "Kategori güncellendi.",
        errorAdd: "Kategori eklenirken bir hata oluştu.",
        errorUpdate: "Kategori güncellenirken bir hata oluştu.",
      },
    });
  };

  return (
    <form
      className={cn("grid items-start gap-6", className)}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="grid gap-3">
        <FormInput
          id="category"
          label="Kategori"
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
