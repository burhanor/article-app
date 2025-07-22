import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/errorMessage/errorMessage";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  id: string;
  label: string;
  type?: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
};

export default function FormInput({
  id,
  label,
  type = "text",
  error,
  register,
}: FormInputProps) {
  return (
    <div className="grid gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Input type={type} id={id} {...register} />
      <ErrorMessage message={error?.message} />
    </div>
  );
}
