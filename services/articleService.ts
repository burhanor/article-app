import TopArticleDto from "@/models/TopArticleDto";
import apiClient from "./client";
import { config } from "@/config/config";
import { ArticleDto } from "@/models/Article";
import { createGenericService } from "./genericService";
import { getAvatars, getNicknames } from "./userService";
import { ArticleFormValues } from "@/schemas/articleSchema";
import { PaginationContainer } from "@/models/types/PaginationContainer";
import { ArticleInfo } from "@/models/ArticleInfo";
import { Status } from "@/enums/Status";

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

// Ortak işlem fonksiyonu
async function enrichArticles(articles: ArticleDto[]) {
  if (articles.length === 0) return articles;

  const userIds = articles.map((a) => a.userId);
  const [users, avatars] = await Promise.all([
    getNicknames(userIds),
    getAvatars(userIds),
  ]);

  return articles.map((article) => {
    const user = users.find((u) => u.id === article.userId);
    const avatar = avatars.find((a) => a.id === article.userId);

    return {
      ...article,
      publishDate: article.publishDate
        ? new Date(article.publishDate)
        : undefined,
      nickname: user?.nickname ?? "Bilinmiyor",
      avatar: avatar?.avatar ?? "",
    };
  });
}

async function fetchArticles(
  url: string,
  searchKey: string,
  pageNumber: number = 1,
  pageSize: number = 10,
  status: Status = Status.Published
): Promise<PaginationContainer<ArticleDto>> {
  try {
    const response = await apiClient.get<PaginationContainer<ArticleDto>>(url, {
      params: { searchKey, pageNumber, pageSize, status },
    });

    const enrichedItems = await enrichArticles(response.data.items);

    const articleIds = enrichedItems.map((item) => item.id);

    const articleInfo = await getArticleInfo(articleIds);
    enrichedItems.forEach((item) => {
      const info = articleInfo.find((i) => i.articleId === item.id);
      if (info) {
        item.info = info;
      } else {
        item.info = {
          articleId: item.id,
          likeCount: 0,
          dislikeCount: 0,
          viewCount: 0,
        };
      }
    });
    return {
      ...response.data,
      items: enrichedItems,
    };
  } catch (error) {
    console.error("Makale sayfaları alınırken bir hata oluştu:", error);
    return {
      items: [],
      pageNumber: 1,
      pageSize,
      totalCount: 0,
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    };
  }
}

export function getArticleByPage(
  searchKey: string,
  pageNumber: number = 1,
  pageSize: number = 10,
  status: Status = Status.Published
) {
  return fetchArticles("/article", searchKey, pageNumber, pageSize, status);
}

export function getArticlesBySlug(
  searchKey: string,
  pageNumber: number = 1,
  pageSize: number = 10,
  status: Status = Status.Published
) {
  return fetchArticles(
    "/article/by-category",
    searchKey,
    pageNumber,
    pageSize,
    status
  );
}

export async function articleIsExist(slug: string): Promise<boolean> {
  const response = await apiClient.get<boolean>(
    `/article/${encodeURIComponent(slug)}/exist`
  );
  return response.data;
}
export async function getArticleInfo(
  articleIds: number[]
): Promise<ArticleInfo[]> {
  try {
    const response = await apiClient.post<ArticleInfo[]>(
      "/article/info",
      articleIds
    );
    return response.data;
  } catch (error) {
    console.error("Makale bilgileri alınırken bir hata oluştu:", error);
    return [];
  }
}

export async function getArticle(slug: string): Promise<ArticleDto> {
  try {
    const response = await apiClient.get<ArticleDto>(
      `/article/${encodeURIComponent(slug)}/detail`
    );
    if (response.data.id > 0) {
      const info = await getArticleInfo([response.data.id]);
      response.data.info = info[0] || {
        articleId: response.data.id,
        likeCount: 0,
        dislikeCount: 0,
        viewCount: 0,
      };
      const avatar = await getAvatars([response.data.userId]);
      response.data.avatar = avatar[0]?.avatar || "";
      console.log("Article fetched:", response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Makale alınırken bir hata oluştu:", error);
  }
  return {
    id: 0,
    title: "",
    content: "",
    slug: "",
    userId: 0,
    publishDate: undefined,
    nickname: "Bilinmiyor",
    avatar: "",
    info: {
      articleId: 0,
      likeCount: 0,
      dislikeCount: 0,
      viewCount: 0,
    },
    status: Status.Published,
    categories: [],
    tags: [],
  };
}
