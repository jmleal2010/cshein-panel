import { NextRequest, NextResponse } from "next/server";
import { AUTH, AUTH_TOKEN, routes } from "@/config/consts";
export function middleware(request: NextRequest) {
  const cookies = request.cookies;
  const authToken = cookies.get(AUTH_TOKEN)?.value;

  if (!authToken && request.nextUrl.pathname.startsWith(routes.dashboard)) {
    const response = NextResponse.redirect(new URL(routes.login, request.url));
    cookies.delete(AUTH_TOKEN);
    return response;
  }

  if (!authToken && request.nextUrl.pathname.startsWith(routes.orders)) {
    const response = NextResponse.redirect(new URL(routes.login, request.url));
    cookies.delete(AUTH_TOKEN);
    return response;
  }

  if (authToken && request.nextUrl.pathname.startsWith(routes.auth)) {
    return NextResponse.redirect(new URL(routes.dashboard, request.url));
  }
}

export const config = {
  matcher: ["/dashboard(.*)", "/orders(.*)", "/auth(.*)"],
};
