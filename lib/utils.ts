import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import defaultAvatar from "@/public/default-avatar.webp";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAvatarUrl(avatarPath: string | null | undefined): string {
  if (!avatarPath) {
    return defaultAvatar.src;
  }
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}${avatarPath}`;
}
