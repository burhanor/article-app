// app/api/refresh-token/route.ts
import { RevalidateAccessTokenViaRefreshToken } from "@/services/authService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const refreshToken = body.refreshToken;
    if (!refreshToken) {
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });

    const apiResponse = await RevalidateAccessTokenViaRefreshToken(
      refreshToken
    );

    if (apiResponse) {
      response.cookies.set("accessToken", apiResponse, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
    }
    return response;
  } catch (err) {
    console.error("Token refresh error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
