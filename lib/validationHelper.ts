import type { UseFormReturn, Path } from "react-hook-form";
import { ValidationError } from "@/models/types/ResponseContainer";

export function handleValidationErrors<
  TFormValues extends Record<string, unknown>
>(form: UseFormReturn<TFormValues>, validationErrors: ValidationError[]) {
  for (const error of validationErrors) {
    form.setError(error.propertyName.toLowerCase() as Path<TFormValues>, {
      type: "manual",
      message: error.errorMessage,
    });
  }
}
