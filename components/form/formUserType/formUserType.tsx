import {
  FieldError,
  UseFormSetValue,
  UseFormTrigger,
  FieldValues,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/errorMessage/errorMessage";
import UserTypeSelect from "@/components/selects/user-type-select";
import { UserType } from "@/enums/UserType";

type FormUserTypeSelectProps<T extends FieldValues> = {
  label: string;
  name: keyof T;
  userType: UserType;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  error?: FieldError;
};

export default function FormUserType<T extends FieldValues>({
  label,
  name,
  userType,
  setValue,
  trigger,
  error,
}: FormUserTypeSelectProps<T>) {
  return (
    <div className="grid gap-3">
      <Label htmlFor={name as string}>{label}</Label>
      <UserTypeSelect
        userType={userType}
        onChange={(val) => {
          setValue(name as Parameters<typeof setValue>[0], val as T[keyof T]);
          trigger(name as Parameters<typeof trigger>[0]);
        }}
      />
      <ErrorMessage message={error?.message} />
    </div>
  );
}
