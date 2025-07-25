import { Status } from "@/enums/Status";
import { z } from "zod";

export const articleSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .min(1, "Başlık boş olamaz")
    .max(200, "Başlık 200 karakterden uzun olamaz"),
  slug: z
    .string()
    .min(1, "Slug boş olamaz")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug sadece küçük harf, rakam ve tire içerebilir"
    )
    .max(50, "Slug 50 karakterden uzun olamaz"),
  content: z.string().min(1, "İçerik boş olamaz"),
  publishDate: z.date().optional(),
  categories: z.array(z.string()).min(1, "Kategori boş olamaz"),
  tags: z.array(z.string()).min(1, "Etiket boş olamaz"),
  status: z.nativeEnum(Status),
});
export type ArticleFormValues = z.infer<typeof articleSchema>;
