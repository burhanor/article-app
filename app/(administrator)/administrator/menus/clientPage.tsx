"use client";
import { columns } from "./columns";
import { GenericCrudPage } from "@/components/administrator/genericCrudPage/genericCrudPage";
import { useMenuStore } from "@/stores/menuStore";
import MenuForm from "./menuForm";
import menuService from "@/services/menuItemService";

export default function ClientPage() {
  const store = useMenuStore();
  return (
    <GenericCrudPage
      entityName="Menü"
      store={store}
      service={menuService}
      columns={columns}
      FormComponent={MenuForm}
      itemLabelKey="title"
    />
  );
}
