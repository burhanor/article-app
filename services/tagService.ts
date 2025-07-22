import { Tag } from "@/models/Tag";
import apiClient from "./client";
import { ResponseStatus } from "@/enums/ResponseStatus";
import { ResponseContainer, Unit } from "@/models/types/ResponseContainer";
import { TagFormValues } from "@/schemas/tagSchema";

export async function fetchTags(): Promise<Tag[]> {
  try {
    const response = await apiClient.get("/tag");
    console.log("Etiketler:", response.data);
    return response.data.items as Tag[];
  } catch (error) {
    console.error("Etiketler alınırken bir hata oluştu:", error);
    return [];
  }
}

export async function deleteTags(
  tagIds: number[]
): Promise<ResponseContainer<Unit>> {
  try {
    const response = await apiClient.delete("/tag", {
      data: tagIds,
    });
    return response.data as ResponseContainer<Unit>;
  } catch (error) {
    console.error("Etiketler silinirken bir hata oluştu:", error);
  }
  return {
    status: ResponseStatus.Failed,
    message: "Etiketler silinirken bir hata oluştu.",
  } as ResponseContainer<Unit>;
}

export async function addTag(
  tag: TagFormValues
): Promise<ResponseContainer<Tag>> {
  try {
    const response = await apiClient.post("/tag", tag);
    return response.data as ResponseContainer<Tag>;
  } catch (error) {
    console.error("Etiket eklenirken bir hata oluştu:", error);
    return {
      status: ResponseStatus.Failed,
      message: "Etiket eklenirken bir hata oluştu.",
    } as ResponseContainer<Tag>;
  }
}
export async function updateTag(
  tag: TagFormValues
): Promise<ResponseContainer<Tag>> {
  try {
    const response = await apiClient.put(`/tag/${tag.id}`, tag);
    return response.data as ResponseContainer<Tag>;
  } catch (error) {
    console.error("Etiket güncellenirken bir hata oluştu:", error);
    return {
      status: ResponseStatus.Failed,
      message: "Etiket güncellenirken bir hata oluştu.",
    } as ResponseContainer<Tag>;
  }
}
