import { StatusCount } from "@/models/statistics/StatusCount";
import apiClient from "./client";
import { UserTypeCount } from "@/models/statistics/UserTypeCount";
import { NameSlugCount } from "@/models/statistics/NameSlugCount";
import { AuthorArticle } from "@/models/statistics/AuthorArticle";
import { TopArticle } from "@/models/statistics/TopArticle";
import { ArticleRate } from "@/models/statistics/ArticleRate";

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

export async function GetTopArticles(
  startDate: Date,
  endDate: Date,
  count?: number
): Promise<TopArticle[]> {
  try {
    const response = await apiClient.get(basePath + "top-articles", {
      params: { startDate, endDate, count },
    });
    const data = response.data as TopArticle[];
    return data.filter((item) => item.viewCount > 0);
  } catch (error) {
    console.error(`${basePath} verileri alınırken hata oluştu:`, error);
    return [];
  }
}

export async function GetTopArticleRates(
  startDate: Date,
  endDate: Date,
  count?: number
): Promise<ArticleRate[]> {
  try {
    const response = await apiClient.get(basePath + "article-rates", {
      params: { startDate, endDate, count },
    });
    return response.data;
  } catch (error) {
    console.error(`${basePath} verileri alınırken hata oluştu:`, error);
    return [];
  }
}

export async function GetArticleViewCounts(
  startDate: Date,
  endDate: Date
): Promise<{ viewDay: Date; totalViews: number; uniqueViews: number }[]> {
  try {
    const response = await apiClient.get(basePath + "article-views", {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    console.error(`${basePath} verileri alınırken hata oluştu:`, error);
    return [];
  }
}
