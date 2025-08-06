import { Status } from "@/enums/Status";
import { ArticleDto } from "../Article";

export const defaultArticleDto: ArticleDto = {
  id: 0,
  title: "",
  content: "",
  publishDate: undefined,
  slug: "",
  userId: 0,
  status: Status.Pending,
  categories: [],
  tags: [],
  nickname: "",
  avatar: undefined,
  info: {
    articleId: 0,
    likeCount: 0,
    dislikeCount: 0,
    viewCount: 0,
  },
};
