import TopArticleDto from "@/models/TopArticleDto";
import apiClient from "./client";
import { config } from "@/config/config";
import { ArticleDto } from "@/models/Article";
import { createGenericService } from "./genericService";
import { getNicknames } from "./userService";
import { ArticleFormValues } from "@/schemas/articleSchema";

export async function getMostViewedArticles(
  count?: number
): Promise<TopArticleDto[]> {
  try {
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

const baseService = createGenericService<ArticleDto, ArticleFormValues>(
  "/article"
);

const articleService = {
  ...baseService,
  async fetchAll(): Promise<ArticleDto[]> {
    try {
      const articles = await baseService.fetchAll();
      if (articles.length > 0) {
        const userIds = articles.map((article) => article.userId);
        const users = await getNicknames(userIds);

        articles.forEach((article) => {
          const user = users.find((u) => u.id === article.userId);
          if (article.publishDate) {
            const publishDate = new Date(article.publishDate);
            article.publishDate = publishDate;
          }
          if (user) {
            article.nickname = user.nickname;
          } else {
            article.nickname = "Bilinmiyor";
          }
        });
      }
      return articles;
    } catch {
      return [];
    }
  },
};

export default articleService;
