import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import defaultAvatar from "@/public/default-avatar.webp";
import seoData from "@/data/seo.json";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAvatarUrl(avatarPath: string | null | undefined): string {
  if (!avatarPath) {
    return defaultAvatar.src;
  }
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}${avatarPath}`;
}

export function formatDate(date: string | null): string {
  if (!date) return "";
  //dd.MM.yyyy

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString("tr-TR", options);
}

type SeoData = typeof seoData;
type SeoPageKey = keyof SeoData;

export function getSeoMetadata(pageKey: SeoPageKey) {
  const data = seoData[pageKey];

  return {
    title: data?.title ?? "Varsayılan Başlık",
    description: data?.description ?? "Varsayılan açıklama",
    keywords: data?.keywords ?? "",
  };
}
