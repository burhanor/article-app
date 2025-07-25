import { User, UserRequestDto } from "@/models/User";
import apiClient from "./client";
import { ResponseStatus } from "@/enums/ResponseStatus";
import { ResponseContainer, Unit } from "@/models/types/ResponseContainer";
import { UserFormValues } from "@/schemas/userSchema";
import { UserNickname } from "@/models/UserNickname";

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await apiClient.get("/user");
    console.log("Kullanıcılar:", response.data);
    return response.data.items as User[];
  } catch (error) {
    console.error("Kullanıcılar alınırken bir hata oluştu:", error);
    return [];
  }
}

export async function getNicknames(userIds: number[]): Promise<UserNickname[]> {
  try {
    const response = await apiClient.post("/user/nicknames", userIds);
    console.log("Nicknames:", response.data);
    return response.data as UserNickname[];
  } catch (error) {
    console.error("Nicknames alınırken bir hata oluştu:", error);
    return [];
  }
}

export async function deleteUsers(
  userIds: number[]
): Promise<ResponseContainer<Unit>> {
  try {
    const response = await apiClient.delete("/user", {
      data: userIds,
    });
    return response.data as ResponseContainer<Unit>;
  } catch (error) {
    console.error("Kullanıcılar silinirken bir hata oluştu:", error);
  }
  return {
    status: ResponseStatus.Failed,
    message: "Kullanıcılar silinirken bir hata oluştu.",
  } as ResponseContainer<Unit>;
}

export async function addUser(
  user: UserFormValues
): Promise<ResponseContainer<User>> {
  try {
    const request: UserRequestDto = {
      id: user.id || 0,
      emailAddress: user.emailAddress,
      nickname: user.nickname,
      isActive: user.isActive,
      userType: user.userType,
      password: user.password || "",
      file: user.avatar || null,
    };
    const response = await apiClient.post("/user", request, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data as ResponseContainer<User>;
  } catch (error) {
    console.error("Kullanıcı eklenirken bir hata oluştu:", error);
    return {
      status: ResponseStatus.Failed,
      message: "Kullanıcı eklenirken bir hata oluştu.",
    } as ResponseContainer<User>;
  }
}
export async function updateUser(
  user: UserFormValues
): Promise<ResponseContainer<User>> {
  try {
    const request: UserRequestDto = {
      id: user.id || 0,
      emailAddress: user.emailAddress,
      nickname: user.nickname,
      isActive: user.isActive,
      userType: user.userType,
      password: user.password || "",
      file: user.avatar || null,
    };
    const response = await apiClient.put(`/user/${user.id}`, request, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data as ResponseContainer<User>;
  } catch (error) {
    console.error("Kullanıcı güncellenirken bir hata oluştu:", error);
    return {
      status: ResponseStatus.Failed,
      message: "Kullanıcı güncellenirken bir hata oluştu.",
    } as ResponseContainer<User>;
  }
}
