import { jwtVerify } from "jose";
export async function verifyToken(
  token?: string,
  refreshToken?: string
): Promise<string> {
  if (!token) {
    return "";
  }
  const SECRET_KEY = new TextEncoder().encode(
    process.env.NEXT_JWT_SECRET_KEY || ""
  );

  try {
    await jwtVerify(token, SECRET_KEY);
    console.log("Token doğrulandı:");
    return token;
  } catch (error) {
    console.error("Token doğrulama hatası:", error);
    const newAccessToken = await refreshAccessToken(refreshToken);
    return newAccessToken || "";
  }
  return "";
}

// Access Tokenı refresh etmek için kullanılabilir
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
