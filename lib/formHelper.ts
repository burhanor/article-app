import { ActionTypes } from "@/enums/ActionTypes";
import { showSuccess } from "./swalHelper";
import { handleValidationErrors } from "./validationHelper";
import { ResponseStatus } from "@/enums/ResponseStatus";
import { toast } from "sonner";
import { ResponseContainer } from "@/models/types/ResponseContainer";
import { FieldValues, UseFormReturn } from "react-hook-form";

type SubmitHandlerOptions<
  T extends { id: number },
  TFormValues extends FieldValues
> = {
  data: TFormValues;
  actionType: ActionTypes;
  selectedItem?: T;
  addApi: (data: TFormValues) => Promise<ResponseContainer<T>>;
  updateApi: (data: TFormValues) => Promise<ResponseContainer<T>>;
  onSuccess: (data: T) => void;
  form: UseFormReturn<TFormValues>;
  modal: { closeModal: () => void };
  messages: {
    add: string;
    update: string;
    errorAdd?: string;
    errorUpdate?: string;
  };
};

export async function handleFormSubmit<
  T extends { id: number },
  TFormValues extends FieldValues
>({
  data,
  actionType,
  selectedItem,
  addApi,
  updateApi,
  onSuccess,
  form,
  modal,
  messages,
}: SubmitHandlerOptions<T, TFormValues>) {
  try {
    const isAdd = actionType === ActionTypes.ADD;
    const isUpdate = actionType === ActionTypes.UPDATE;

    if (isAdd) {
      const response = await addApi(data);

      if (response.status === ResponseStatus.Success) {
        showSuccess(messages.add);
        onSuccess(response.data as T);
        modal.closeModal();
      } else if (response.status === ResponseStatus.ValidationError) {
        handleValidationErrors(form, response.validationErrors);
      } else {
        toast.error(response.message || messages.errorAdd || "Ekleme hatası.");
      }
    }

    if (isUpdate && selectedItem) {
      const updateData = { ...data, id: (selectedItem as T).id };

      const response = await updateApi(updateData);

      if (response.status === ResponseStatus.Success) {
        showSuccess(messages.update);
        onSuccess(response.data as T);
        modal.closeModal();
      } else if (response.status === ResponseStatus.ValidationError) {
        handleValidationErrors(form, response.validationErrors);
      } else {
        toast.error(
          response.message || messages.errorUpdate || "Güncelleme hatası."
        );
      }
    }
  } catch {
    toast.error("Sunucuya bağlanırken bir hata oluştu.");
  }
}
