"use client";
import { columns } from "./columns";
import { GenericCrudPage } from "@/components/administrator/genericCrudPage/genericCrudPage";
import { useTagStore } from "@/stores/tagStore";
import tagService from "@/services/tagService";
import TagForm from "./tagForm";

export default function ClientPage() {
  const store = useTagStore();
  return (
    <GenericCrudPage
      entityName="Etiket"
      store={store}
      service={tagService}
      columns={columns}
      FormComponent={TagForm}
      itemLabelKey="name"
    />
  );
}
