import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("accessToken"); // örnek: çerezde token var mı?

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/administrator") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
