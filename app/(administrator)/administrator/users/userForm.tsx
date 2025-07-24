import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { cn, getAvatarUrl } from "@/lib/utils";
import { UpsertButton } from "@/components/buttons/upsertButton";

import { useModal } from "@/hooks/use-modal";
import { useUserStore } from "@/stores/userStore";

import { User } from "@/models/User";
import { userSchema, UserFormValues } from "@/schemas/userSchema";
import { ActionTypes } from "@/enums/ActionTypes";
import { ResponseStatus } from "@/enums/ResponseStatus";
import { handleValidationErrors } from "@/lib/validationHelper";

import {
  addUser as addUserApi,
  updateUser as updateUserApi,
} from "@/services/userService";
import { showSuccess } from "@/lib/swalHelper";
import FormInput from "@/components/form/formInput/formInput";
import { UserType } from "@/enums/UserType";
import FormUserType from "@/components/form/formUserType/formUserType";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/errorMessage/errorMessage";
import { Checkbox } from "@/components/ui/checkbox";

import ImageUploadPreview from "@/components/imageUploads/image-upload-preview";
const defaultItem: User = {
  nickname: "",
  emailAddress: "",
  userType: UserType.Guest,
  isActive: false,
  avatarPath: "",
  password: "",

  id: 0,
};
export default function UserForm({
  className,
  modal,
}: {
  className?: string;
  modal: ReturnType<typeof useModal>;
}) {
  const { selectedItems, actionType, addItem, updateItem } = useUserStore();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file);
  };

  const selectedItem =
    actionType === ActionTypes.UPDATE
      ? selectedItems[0] || defaultItem
      : defaultItem;

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      nickname: selectedItem.nickname || defaultItem.nickname,
      emailAddress: selectedItem.emailAddress || defaultItem.emailAddress,
      userType: selectedItem.userType || defaultItem.userType,
      isActive: selectedItem.isActive || defaultItem.isActive,
      avatar: undefined,
      password: "",
      id: selectedItem.id || defaultItem.id,
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    data.avatar = selectedImage;
    console.log("Form data:", data);
    try {
      if (actionType === ActionTypes.ADD) {
        const response = await addUserApi(data);

        if (response.status === ResponseStatus.Success) {
          showSuccess("Kullanıcı başarıyla eklendi.");
          addItem(response.data as User);
          modal.closeModal();
        } else if (response.status === ResponseStatus.ValidationError) {
          handleValidationErrors(form, response.validationErrors);
        } else {
          toast.error(
            response.message || "Kullanıcı eklenirken bir hata oluştu."
          );
        }
      } else if (actionType === ActionTypes.UPDATE) {
        data.id = selectedItem.id;
        const response = await updateUserApi(data);

        if (response.status === ResponseStatus.Success) {
          showSuccess("Kullanıcı güncellendi.");
          updateItem(response.data as User);
          modal.closeModal();
        } else if (response.status === ResponseStatus.ValidationError) {
          handleValidationErrors(form, response.validationErrors);
        } else {
          toast.error(
            response.message || "Kullanıcı güncellenirken bir hata oluştu."
          );
        }
      }
    } catch {
      toast.error("Sunucuya bağlanırken bir hata oluştu.");
    }
  };

  return (
    <div className={cn("grid items-start gap-6", className)}>
      <div className="grid gap-4">
        <ImageUploadPreview
          className="max-w-none"
          onImageSelect={handleImageSelect}
          previewImageLink={getAvatarUrl(selectedItem.avatarPath)}
          acceptedTypes={["image/jpeg", "image/png", "image/gif", "image/webp"]}
          previewMode="contain"
        />
      </div>
      <form
        className={cn("grid items-start gap-6", className)}
        encType="multipart/form-data"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-3">
          <FormInput
            id="nickname"
            label="Kullanıcı Adı"
            error={form.formState.errors.nickname}
            register={form.register("nickname")}
          />
        </div>
        <div className="grid gap-3">
          <FormInput
            id="emailAddress"
            label="E-posta Adresi"
            error={form.formState.errors.emailAddress}
            register={form.register("emailAddress")}
          />
        </div>
        <div className="grid gap-3">
          <FormInput
            id="password"
            label="Şifre"
            type="password"
            error={form.formState.errors.password}
            register={form.register("password")}
          />
        </div>
        <div className="grid gap-3">
          <FormUserType
            label="Kullanıcı Tipi"
            name="userType"
            userType={form.watch("userType") as UserType}
            setValue={form.setValue}
            trigger={form.trigger}
            error={form.formState.errors.userType}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="isActive" className="mb-0">
            Durum
          </Label>
          <Controller
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <Checkbox
                id="isActive"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            )}
          />{" "}
          <ErrorMessage message={form.formState.errors.isActive?.message} />
        </div>

        <UpsertButton actionType={actionType} />
      </form>
    </div>
  );
}
