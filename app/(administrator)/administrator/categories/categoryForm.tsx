import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StatusSelect from "@/components/selects/status-select";
import { UpsertButton } from "@/components/buttons/upsertButton";

import { useModal } from "@/hooks/use-modal";
import { useCategoryStore } from "@/stores/categoryStore";

import { Category } from "@/models/Category";
import { categorySchema, CategoryFormValues } from "@/schemas/categorySchema";
import { ActionTypes } from "@/enums/ActionTypes";
import { ResponseStatus } from "@/enums/ResponseStatus";
import { handleValidationErrors } from "@/lib/validationHelper";

import {
  addCategory as addCategoryApi,
  updateCategory as updateCategoryApi,
} from "@/services/categoryService";
import { Status } from "@/enums/Status";
const defaultCategory: Category = {
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
  const { selectedCategories, actionType, addCategory, updateCategory } =
    useCategoryStore();

  const selectedCategory =
    actionType === ActionTypes.UPDATE
      ? selectedCategories[0] || defaultCategory
      : defaultCategory;

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: selectedCategory.name || "",
      slug: selectedCategory.slug || "",
      status: selectedCategory.status || Status.Pending,
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      if (actionType === ActionTypes.ADD) {
        const response = await addCategoryApi(data);

        if (response.status === ResponseStatus.Success) {
          Swal.fire({
            title: "Başarılı",
            text: "Kategori başarıyla eklendi.",
            icon: "success",
            confirmButtonText: "Tamam",
          });
          addCategory(response.data as Category);
          modal.closeModal();
        } else if (response.status === ResponseStatus.ValidationError) {
          handleValidationErrors(form, response.validationErrors);
        } else {
          toast.error(
            response.message || "Kategori eklenirken bir hata oluştu."
          );
        }
      } else if (actionType === ActionTypes.UPDATE) {
        data.id = selectedCategory.id;
        const response = await updateCategoryApi(data);

        if (response.status === ResponseStatus.Success) {
          Swal.fire({
            title: "Başarılı",
            text: "Kategori güncellendi.",
            icon: "success",
            confirmButtonText: "Tamam",
          });
          updateCategory(response.data as Category);
          modal.closeModal();
        } else if (response.status === ResponseStatus.ValidationError) {
          handleValidationErrors(form, response.validationErrors);
        } else {
          toast.error(
            response.message || "Kategori güncellenirken bir hata oluştu."
          );
        }
      }
    } catch (error) {
      toast.error("Sunucuya bağlanırken bir hata oluştu.");
      console.error(error);
    }
  };

  return (
    <form
      className={cn("grid items-start gap-6", className)}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="grid gap-3">
        <Label htmlFor="category">Kategori</Label>
        <Input type="text" id="category" {...form.register("name")} />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>
      <div className="grid gap-3">
        <Label htmlFor="slug">Slug</Label>
        <Input type="text" id="slug" {...form.register("slug")} />
        {form.formState.errors.slug && (
          <p className="text-sm text-red-500">
            {form.formState.errors.slug.message}
          </p>
        )}
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
        {form.formState.errors.status && (
          <p className="text-sm text-red-500">
            {form.formState.errors.status.message}
          </p>
        )}
      </div>

      <UpsertButton actionType={actionType} />
    </form>
  );
}
