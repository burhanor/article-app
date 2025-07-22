import { Status } from "@/enums/Status";
import {
  FieldError,
  UseFormSetValue,
  UseFormTrigger,
  FieldValues,
} from "react-hook-form";
import StatusSelect from "@/components/selects/status-select";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/errorMessage/errorMessage";

type FormStatusSelectProps<T extends FieldValues> = {
  label: string;
  name: keyof T;
  status: Status;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  error?: FieldError;
};

export default function FormStatusSelect<T extends FieldValues>({
  label,
  name,
  status,
  setValue,
  trigger,
  error,
}: FormStatusSelectProps<T>) {
  return (
    <div className="grid gap-3">
      <Label htmlFor={name as string}>{label}</Label>
      <StatusSelect
        status={status}
        onChange={(val) => {
          setValue(name as Parameters<typeof setValue>[0], val as T[keyof T]);
          trigger(name as Parameters<typeof trigger>[0]);
        }}
      />
      <ErrorMessage message={error?.message} />
    </div>
  );
}
