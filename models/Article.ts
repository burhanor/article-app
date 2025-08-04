import { Status } from "@/enums/Status";
import { CategoryDto } from "./CategoryDto";
import { TagDto } from "./TagDto";

export interface Article {
  id: number;
  title: string;
  content: string;
  publishDate?: Date;
  slug: string;
  userId: number;
  status: Status;
  categories: CategoryDto[];
  tags: TagDto[];
}

export interface ArticleDto extends Article {
  nickname: string;
  avatar?: string;
}
