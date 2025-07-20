import { ResponseStatus } from "@/enums/ResponseStatus";
export type Unit = void;

export interface ValidationError {
  propertyName: string;
  errorMessage: string;
}

export interface ResponseContainer<T> {
  data?: T;
  message?: string;
  status: ResponseStatus;
  validationErrors: ValidationError[];
}
