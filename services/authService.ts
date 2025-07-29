import { ResponseStatus } from "@/enums/ResponseStatus";
import apiClient from "./client";
import { readToken } from "@/lib/tokenHelper";
import { TokenPayload } from "@/models/TokenPayload";

export async function Login(
  email: string,
  password: string
): Promise<TokenPayload | null> {
  try {
    const loginUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/Auth/login";
    const response = await apiClient.post(loginUrl, {
      nickname: email,
      password: password,
    });
    const status = response.data.status;

    if (status === ResponseStatus.Success) {
      const accessToken = response.data.data.accessToken;
      const tokenPayload = readToken(accessToken);
      return tokenPayload;
    }
  } catch (error) {
    console.error("Giriş işlemi sırasında bir hata oluştu:", error);
  }
  return null;
}

export async function Logout(): Promise<boolean> {
  try {
    const logoutUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/Auth/logout";
    await apiClient.post(logoutUrl);
    return true;
  } catch (error) {
    console.error("Çıkış işlemi sırasında bir hata oluştu:", error);
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
