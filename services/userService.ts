import { User } from "@/models/User";
import { createGenericService } from "./genericService";
import { UserFormValues } from "@/schemas/userSchema";
import { UserNickname } from "@/models/UserNickname";
import apiClient from "./client";
import { UserAvatar } from "@/models/UserAvatar";

export async function getNicknames(userIds: number[]): Promise<UserNickname[]> {
  try {
    const response = await apiClient.post("/user/nicknames", userIds);
    return response.data as UserNickname[];
  } catch (error) {
    console.error("Nicknames alınırken bir hata oluştu:", error);
    return [];
  }
}

export async function getAvatars(userIds: number[]): Promise<UserAvatar[]> {
  try {
    const response = await apiClient.post("/user/avatars", userIds);
    return response.data as UserAvatar[];
  } catch (error) {
    console.error("Avatarlar alınırken bir hata oluştu:", error);
    return [];
  }
}

const userService = createGenericService<User, UserFormValues>(
  "/user",
  "multipart/form-data"
);

export default userService;

export async function userIsExist(nickname: string): Promise<boolean> {
  try {
    const response = await apiClient.get<boolean>(`/user/${nickname}/exist`);
    return response.data;
  } catch {}

  return false;
}
