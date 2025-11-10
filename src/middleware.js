import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import {createEdgeSupabaseClient} from "../utils/supabase/midleware";


const SUPPORTED_LOCALES = ["en", "de"];
const PUBLIC_ROUTES = ["/login", "/signup"];

const intlMiddleware = createIntlMiddleware({
  locales: SUPPORTED_LOCALES,
  defaultLocale: "en",
});

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const locale =
    SUPPORTED_LOCALES.find((l) => pathname.startsWith(`/${l}`)) || "en";
  const normalizedPath = pathname.replace(/^\/(en|de)/, "") || "/";

  const response = NextResponse.next();


  const supabase = createEdgeSupabaseClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();


  if (!user && !PUBLIC_ROUTES.includes(normalizedPath)) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  if (user && PUBLIC_ROUTES.includes(normalizedPath)) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return intlMiddleware(request, { response });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
