import { StatusCount } from "@/models/statistics/StatusCount";
import apiClient from "./client";
import { UserTypeCount } from "@/models/statistics/UserTypeCount";
import { NameSlugCount } from "@/models/statistics/NameSlugCount";
import { AuthorArticle } from "@/models/statistics/AuthorArticle";

const basePath = "/stats/";

export async function GetArticleStatusCount(): Promise<StatusCount[]> {
  try {
    const response = await apiClient.get(basePath + "article-status");
    const data = response.data as StatusCount[];
    return data.filter((item) => item.count > 0);
  } catch (error) {
    console.error(`${basePath} verileri alınırken hata oluştu:`, error);
    return [];
  }
}
export async function GetCategoryStatusCount(): Promise<StatusCount[]> {
  try {
    const response = await apiClient.get(basePath + "category-status");
    const data = response.data as StatusCount[];
    return data.filter((item) => item.count > 0);
  } catch (error) {
    console.error(`${basePath} verileri alınırken hata oluştu:`, error);
    return [];
  }
}
export async function GetTagStatusCount(): Promise<StatusCount[]> {
  try {
    const response = await apiClient.get(basePath + "tag-status");
    const data = response.data as StatusCount[];
    return data.filter((item) => item.count > 0);
  } catch (error) {
    console.error(`${basePath} verileri alınırken hata oluştu:`, error);
    return [];
  }
}

export async function GetUserTypeCount(): Promise<UserTypeCount[]> {
  try {
    const response = await apiClient.get(basePath + "user-types");
    const data = response.data as UserTypeCount[];
    return data.filter((item) => item.count > 0);
  } catch (error) {
    console.error(`${basePath} verileri alınırken hata oluştu:`, error);
    return [];
  }
}

export async function GetTopCategories(
  limit?: number
): Promise<NameSlugCount[]> {
  try {
    const response = await apiClient.get(basePath + "top-categories", {
      params: { limit },
    });
    const data = response.data as NameSlugCount[];
    return data.filter((item) => item.count > 0);
  } catch (error) {
    console.error(`${basePath} verileri alınırken hata oluştu:`, error);
    return [];
  }
}

export async function GetTopTags(limit?: number): Promise<NameSlugCount[]> {
  try {
    const response = await apiClient.get(basePath + "top-tags", {
      params: { limit },
    });
    const data = response.data as NameSlugCount[];
    return data.filter((item) => item.count > 0);
  } catch (error) {
    console.error(`${basePath} verileri alınırken hata oluştu:`, error);
    return [];
  }
}

export async function GetTopAuthors(limit?: number): Promise<AuthorArticle[]> {
  try {
    const response = await apiClient.get(basePath + "top-authors", {
      params: { limit },
    });
    const data = response.data as AuthorArticle[];
    return data.filter((item) => item.totalCount > 0);
  } catch (error) {
    console.error(`${basePath} verileri alınırken hata oluştu:`, error);
    return [];
  }
}
