import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { UpsertButton } from "@/components/buttons/upsertButton";

import { useModal } from "@/hooks/use-modal";

import { ActionTypes } from "@/enums/ActionTypes";
import FormInput from "@/components/form/formInput/formInput";
import { addMenuItem, updateMenuItem } from "@/services/menuItemService";
import { MenuItem } from "@/models/MenuItem";
import { MenuType } from "@/enums/MenuType";
import { MenuItemFormValues, menuSchema } from "@/schemas/menuItemSchema";
import { useMenuStore } from "@/stores/menuStore";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/errorMessage/errorMessage";
import MenuTypeSelect from "@/components/selects/menu-type-select";
import { handleFormSubmit } from "@/lib/formHelper";
const defaultItem: MenuItem = {
  id: 0,
  title: "",
  description: "",
  link: "",
  menuType: MenuType.Header,
  displayOrder: 1,
};
export default function MenuForm({
  className,
  modal,
}: {
  className?: string;
  modal: ReturnType<typeof useModal>;
}) {
  const { selectedItems, actionType, addItem, updateItem } = useMenuStore();

  const selectedItem =
    actionType === ActionTypes.UPDATE
      ? selectedItems[0] || defaultItem
      : defaultItem;

  const form = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      title: selectedItem.title || "",
      description: selectedItem.description || "",
      link: selectedItem.link || "",
      menuType: selectedItem.menuType || MenuType.Header,
      displayOrder: selectedItem.displayOrder || 1,
    },
  });

  const onSubmit = async (data: MenuItemFormValues) => {
    await handleFormSubmit<MenuItem, MenuItemFormValues>({
      data,
      actionType,
      selectedItem,
      addApi: addMenuItem,
      updateApi: updateMenuItem,
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
        add: "Menü başarıyla eklendi.",
        update: "Menü güncellendi.",
        errorAdd: "Menü eklenirken bir hata oluştu.",
        errorUpdate: "Menü güncellenirken bir hata oluştu.",
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
          id="title"
          label="Başlık"
          error={form.formState.errors.title}
          register={form.register("title")}
        />
      </div>
      <div className="grid gap-3">
        <FormInput
          id="description"
          label="Açıklama"
          error={form.formState.errors.description}
          register={form.register("description")}
        />
      </div>
      <div className="grid gap-3">
        <FormInput
          id="link"
          label="Link"
          error={form.formState.errors.link}
          register={form.register("link")}
        />
      </div>
      <div className="grid gap-3">
        <FormInput
          id="displayOrder"
          label="Sıralama"
          type="number"
          error={form.formState.errors.displayOrder}
          register={form.register("displayOrder", { valueAsNumber: true })}
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="menuType">Durum</Label>
        <MenuTypeSelect
          menuType={form.watch("menuType") as MenuType}
          onChange={(val) => {
            form.setValue("menuType", val);
            form.trigger("menuType");
          }}
        />
        <ErrorMessage message={form.formState.errors.menuType?.message} />
      </div>
      <UpsertButton actionType={actionType} />
    </form>
  );
}
