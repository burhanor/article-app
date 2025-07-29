// lib/services/interfaces/IGenericService.ts

import { ResponseContainer, Unit } from "@/models/types/ResponseContainer";
import { FieldValues } from "react-hook-form";

export interface IGenericService<TModel, TFormValues extends FieldValues> {
  fetchAll(): Promise<TModel[]>;
  delete(ids: number[]): Promise<ResponseContainer<Unit>>;
  add(data: TFormValues): Promise<ResponseContainer<TModel>>;
  update(data: TFormValues): Promise<ResponseContainer<TModel>>;
}
