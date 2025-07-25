import TopArticleDto from "@/models/TopArticleDto";
import apiClient from "./client";
import { config } from "@/config/config";
import { ArticleDto } from "@/models/Article";
import { ResponseContainer, Unit } from "@/models/types/ResponseContainer";
import { ResponseStatus } from "@/enums/ResponseStatus";
import { getNicknames } from "./userService";
import { ArticleFormValues } from "@/schemas/articleSchema";

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

export async function fetchArticles(): Promise<ArticleDto[]> {
  try {
    const response = await apiClient.get("/article");
    console.log("Makaleler:", response.data);
    const articles = response.data.items as ArticleDto[];
    if (articles.length > 0) {
      const userIds = articles.map((article) => article.userId);
      const users = await getNicknames(userIds);
      console.log("Kullanıcılar:", users);
      // Map user nicknames to articles
      articles.forEach((article) => {
        const user = users.find((u) => u.id === article.userId);
        if (user) {
          article.nickname = user.nickname;
        } else {
          article.nickname = "Bilinmiyor";
        }
      });
    }
    return articles;
  } catch (error) {
    console.error("Makaleler alınırken bir hata oluştu:", error);
    return [];
  }
}

export async function deleteArticles(
  categoryIds: number[]
): Promise<ResponseContainer<Unit>> {
  try {
    const response = await apiClient.delete("/article", {
      data: categoryIds,
    });
    return response.data as ResponseContainer<Unit>;
  } catch (error) {
    console.error("Makaleler silinirken bir hata oluştu:", error);
  }
  return {
    status: ResponseStatus.Failed,
    message: "Makaleler silinirken bir hata oluştu.",
  } as ResponseContainer<Unit>;
}

export async function addArticle(
  article: ArticleFormValues
): Promise<ResponseContainer<ArticleDto>> {
  try {
    const response = await apiClient.post("/article", article);
    return response.data as ResponseContainer<ArticleDto>;
  } catch (error) {
    console.error("Makale eklenirken bir hata oluştu:", error);
    return {
      status: ResponseStatus.Failed,
      message: "Makale eklenirken bir hata oluştu.",
    } as ResponseContainer<ArticleDto>;
  }
}
export async function updateArticle(
  article: ArticleFormValues
): Promise<ResponseContainer<ArticleDto>> {
  try {
    const response = await apiClient.put(`/article/${article.id}`, article);
    return response.data as ResponseContainer<ArticleDto>;
  } catch (error) {
    console.error("Makale güncellenirken bir hata oluştu:", error);
    return {
      status: ResponseStatus.Failed,
      message: "Makale güncellenirken bir hata oluştu.",
    } as ResponseContainer<ArticleDto>;
  }
}
