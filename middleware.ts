import { NextRequest, NextResponse } from "next/server";
import { readToken, verifyToken } from "./lib/tokenHelper";
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
  const payload = readToken(accessToken);

  if (pathname.startsWith("/administrator")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (payload?.userType.toString() !== "Admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/administrator/:path*", "/login"],
};
