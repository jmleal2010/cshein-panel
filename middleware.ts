import {NextRequest, NextResponse} from "next/server";
import {AUTH, routes} from "@/config/consts";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authTokens")?.value;

  if (!authToken && request.nextUrl.pathname.startsWith(routes.dashboard)) {
    const response = NextResponse.redirect(new URL(routes.login, request.url));
    response.cookies.delete('authTokens')
    return response;
  }


  if (!authToken && request.nextUrl.pathname.startsWith(routes.orders)) {
    const response = NextResponse.redirect(new URL(routes.login, request.url));
    response.cookies.delete('authTokens')
    return response;
  }

  if (authToken && !request.nextUrl.pathname.startsWith(routes.auth)) {
    return NextResponse.redirect(new URL(routes.dashboard, request.url));
  }
}

export const config = {
  matcher: ["/dashboard(.*)", '/orders(.*)', '/login'],
};
