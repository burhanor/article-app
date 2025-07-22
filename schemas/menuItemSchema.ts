import { MenuType } from "@/enums/MenuType";
import { z } from "zod";

export const menuSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .min(1, "Başlık boş olamaz")
    .max(50, "Başlık 50 karakterden uzun olamaz"),
  description: z
    .string()
    .min(1, "Açıklama boş olamaz")
    .max(100, "Açıklama 100 karakterden uzun olamaz"),
  link: z
    .string()
    .min(1, "Link boş olamaz")
    .regex(
      /^[a-z0-9-_/]+(?:-[a-z0-9-_/]+)*$/,
      "Link sadece küçük harf, rakam, tire ve alt çizgi içerebilir"
    )
    .max(100, "Link 100 karakterden uzun olamaz"),
  menuType: z.nativeEnum(MenuType),
  displayOrder: z
    .number()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Sayı olmalı" }),
});
export type MenuItemFormValues = z.infer<typeof menuSchema>;
