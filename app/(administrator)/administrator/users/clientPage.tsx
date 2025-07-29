"use client";
import { columns } from "./columns";
import { GenericCrudPage } from "@/components/administrator/genericCrudPage/genericCrudPage";

import { useUserStore } from "@/stores/userStore";
import userService from "@/services/userService";
import UserForm from "./userForm";

export default function ClientPage() {
  const store = useUserStore();
  return (
    <GenericCrudPage
      entityName="Kullanıcı"
      store={store}
      service={userService}
      columns={columns}
      FormComponent={UserForm}
      itemLabelKey="nickname"
    />
  );
}
