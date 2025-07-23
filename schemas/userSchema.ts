import { UserType } from "@/enums/UserType";
import { z } from "zod";

export const userSchema = z
  .object({
    id: z.number().optional(),
    emailAddress: z
      .string()
      .min(1, "Email adresi boş olamaz")
      .max(100, "Email adresi 100 karakterden uzun olamaz"),
    nickname: z
      .string()
      .min(1, "Kullanıcı adı boş olamaz")
      .max(50, "Kullanıcı adı 50 karakterden uzun olamaz"),
    password: z.string().optional(),
    isActive: z.boolean(),
    avatar: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || file.size > 0, "Dosya boş olamaz"),
    userType: z.nativeEnum(UserType),
  })
  .superRefine((data, ctx) => {
    const isCreate = data.id === undefined || data.id === null;

    if (isCreate && (!data.password || data.password.length < 6)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Şifre en az 6 karakter olmalı (create işlemi için zorunlu)",
        path: ["password"],
      });
    }
  });
export type UserFormValues = z.infer<typeof userSchema>;
