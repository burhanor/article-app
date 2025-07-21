import { Status } from "@/enums/Status";
import { z } from "zod";

export const categorySchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, "Kategori adı boş olamaz")
    .max(100, "Kategori adı 100 karakterden uzun olamaz"),
  slug: z
    .string()
    .min(1, "Slug boş olamaz")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug sadece küçük harf, rakam ve tire içerebilir"
    )
    .max(50, "Slug 50 karakterden uzun olamaz"),
  status: z.nativeEnum(Status),
});
export type CategoryFormValues = z.infer<typeof categorySchema>;
