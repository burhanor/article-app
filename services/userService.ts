import { User } from "@/models/User";
import { createGenericService } from "./genericService";
import { UserFormValues } from "@/schemas/userSchema";
import { UserNickname } from "@/models/UserNickname";
import apiClient from "./client";

export async function getNicknames(userIds: number[]): Promise<UserNickname[]> {
  try {
    const response = await apiClient.post("/user/nicknames", userIds);
    return response.data as UserNickname[];
  } catch (error) {
    console.error("Nicknames alınırken bir hata oluştu:", error);
    return [];
  }
}

const userService = createGenericService<User, UserFormValues>(
  "/user",
  "multipart/form-data"
);

export default userService;
