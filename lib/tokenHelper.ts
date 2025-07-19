import { TokenPayload } from "@/models/TokenPayload";
import { jwtVerify } from "jose";
export async function verifyToken(
  token?: string,
  refreshToken?: string
): Promise<string> {
  try {
    if (!token) {
      throw new Error("Access token bulunamadı.");
    }
    const SECRET_KEY = new TextEncoder().encode(
      process.env.NEXT_JWT_SECRET_KEY || ""
    );
    await jwtVerify(token, SECRET_KEY);
    return token;
  } catch (error) {
    console.error("Token doğrulama hatası:", error);
    const newAccessToken = await refreshAccessToken(refreshToken);
    return newAccessToken || "";
  }
}

// Access Tokenı refresh etmek için
export async function refreshAccessToken(
  refreshToken?: string
): Promise<string | null> {
  if (!refreshToken) {
    console.error("Refresh token bulunamadı.");
    return null;
  }
  const response = await fetch(
    `${process.env.NEXT_WEBSITE_URL}/api/auth/refreshtoken`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
      credentials: "include",
    }
  );

  const cookies = response.headers.get("set-cookie");
  if (cookies) {
    const accessTokenMatch = cookies.match(/accessToken=([^;]+)/);
    if (accessTokenMatch) {
      const accessToken = accessTokenMatch[1];
      return accessToken;
    }
  }

  return null;
}

export function readToken(accessToken?: string): TokenPayload | null {
  if (!accessToken) {
    return null;
  }
  try {
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    console.log("Token payload:", payload);

    const tokenPayload: TokenPayload = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      image: payload.image,
      userType: payload.userType,
    };

    return tokenPayload;
  } catch (error) {
    console.error("Token okuma hatası:", error);
    return null;
  }
}
