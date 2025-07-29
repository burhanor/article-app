// lib/services/resourceService.ts
import { ResponseContainer, Unit } from "@/models/types/ResponseContainer";
import apiClient from "./client";
import { ResponseStatus } from "@/enums/ResponseStatus";
import { FieldValues } from "react-hook-form";
import { IGenericService } from "@/models/types/IGenericService";
export function createGenericService<TModel, TFormValues extends FieldValues>(
  basePath: string,
  contentType: string = "application/json"
): IGenericService<TModel, TFormValues> {
  return {
    async fetchAll(): Promise<TModel[]> {
      try {
        const response = await apiClient.get(basePath);
        return response.data.items as TModel[];
      } catch (error) {
        console.error(`${basePath} verileri alınırken hata oluştu:`, error);
        return [];
      }
    },

    async delete(ids: number[]): Promise<ResponseContainer<Unit>> {
      try {
        const response = await apiClient.delete(basePath, { data: ids });
        return response.data as ResponseContainer<Unit>;
      } catch (error) {
        console.error(`${basePath} silinirken hata oluştu:`, error);

        return {
          status: ResponseStatus.Failed,
          message: `${basePath} silinirken bir hata oluştu.`,
        } as ResponseContainer<Unit>;
      }
    },

    async add(data: TFormValues): Promise<ResponseContainer<TModel>> {
      try {
        const response = await apiClient.post(basePath, data, {
          headers: {
            "Content-Type": contentType,
          },
        });
        return response.data as ResponseContainer<TModel>;
      } catch (error) {
        console.error(`${basePath} eklenirken hata oluştu:`, error);
        return {
          status: ResponseStatus.Failed,
          message: `${basePath} eklenirken bir hata oluştu.`,
        } as ResponseContainer<TModel>;
      }
    },

    async update(data: TFormValues): Promise<ResponseContainer<TModel>> {
      try {
        const response = await apiClient.put(`${basePath}/${data.id}`, data, {
          headers: {
            "Content-Type": contentType,
          },
        });
        return response.data as ResponseContainer<TModel>;
      } catch (error) {
        console.error(`${basePath} güncellenirken hata oluştu:`, error);
        return {
          status: ResponseStatus.Failed,
          message: `${basePath} güncellenirken bir hata oluştu.`,
        } as ResponseContainer<TModel>;
      }
    },
  };
}
