import TopArticleDto from "@/models/TopArticleDto";
import apiClient from "./client";
import { config } from "@/config/config";

export async function getMostViewedArticles(
  count?: number
): Promise<TopArticleDto[]> {
  try {
    console.log("En çok görüntülenen makaleler alınıyor...");
    if (!count || count <= 0) {
      count = config.MOST_VIEWED_ARTICLE_COUNT;
    }
    const response = await apiClient.get<TopArticleDto[]>(
      `/article/most-viewed?count=${count}`
    );
    return response.data as TopArticleDto[];
  } catch (error) {
    console.error(
      "En çok görüntülenen makaleler alınırken bir hata oluştu:",
      error
    );
    return [];
  }
}

export async function getTopRatedArticles(
  count?: number
): Promise<TopArticleDto[]> {
  try {
    if (!count || count <= 0) {
      count = config.TOP_RATED_ARTICLE_COUNT;
    }
    const response = await apiClient.get<TopArticleDto[]>(
      `/article/top-rated?count=${count}`
    );
    return response.data as TopArticleDto[];
  } catch (error) {
    console.error("En çok oylanan makaleler alınırken bir hata oluştu:", error);
    return [];
  }
}
