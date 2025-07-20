import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/tokenHelper";
import { cookies } from "next/headers";
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const accessToken = await verifyToken(token, refreshToken);
  let isLoggedIn = false;

  if (accessToken) {
    const cookieStore = await cookies();
    isLoggedIn = true;
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/administrator") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/administrator/:path*", "/login"],
};
