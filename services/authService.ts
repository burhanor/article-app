import { ResponseStatus } from "@/enums/ResponseStatus";
import apiClient from "./client";

export async function Login(email: string, password: string): Promise<boolean> {
  try {
    const loginUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/Auth/login";
    const response = await apiClient.post(loginUrl, {
      nickname: email,
      password: password,
    });
    const status = response.data.status;
    console.log("Status", status);
    console.log("Response data:", response.data);
    console.log("Giriş bilgileri:", { nickname: email, password: password });

    return true;
  } catch (error) {
    console.error("Giriş işlemi sırasında bir hata oluştu:", error);
  }
  return false;
}

export async function RevalidateAccessTokenViaRefreshToken(
  refreshToken: string
): Promise<string | null> {
  try {
    const refreshUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL + "/Auth/refresh-token";
    const response = await apiClient.post(refreshUrl, { refreshToken });
    if (response.data && response.data.status === ResponseStatus.Success) {
      return response.data.data.accessToken;
    }
    return null;
  } catch (error) {
    console.error("Access token yenileme hatası:", error);
    return null;
  }
}
