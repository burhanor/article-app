import type { UseFormReturn, Path } from "react-hook-form";
import { ValidationError } from "@/models/types/ResponseContainer";

export function handleValidationErrors<
  TFormValues extends Record<string, unknown>
>(form: UseFormReturn<TFormValues>, validationErrors: ValidationError[]) {
  for (const error of validationErrors) {
    const fieldName =
      error.propertyName.charAt(0).toLowerCase() + error.propertyName.slice(1);
    form.setError(fieldName as Path<TFormValues>, {
      type: "manual",
      message: error.errorMessage,
    });
  }
}
