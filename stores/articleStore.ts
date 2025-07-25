import { createGenericStore } from "./genericStore";
import { ArticleDto } from "@/models/Article";

export const useArticleStore = createGenericStore<ArticleDto>();
