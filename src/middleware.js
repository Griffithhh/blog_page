// src/middleware.js
import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";

const SUPPORTED_LOCALES = ["en", "de"];
const PUBLIC_ROUTES = ["/login", "/signup"];

const intlMiddleware = createIntlMiddleware({
  locales: SUPPORTED_LOCALES,
  defaultLocale: "en",
});

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const locale = SUPPORTED_LOCALES.find((l) => pathname.startsWith(`/${l}`)) || "en";
  const normalizedPath = pathname.replace(/^\/(en|de)/, "") || "/";

  const response = NextResponse.next();


  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll().map(c => ({ name: c.name, value: c.value }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            response.cookies.set(name, value);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();


  if (!user && !PUBLIC_ROUTES.includes(normalizedPath)) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }


  if (user && PUBLIC_ROUTES.includes(normalizedPath)) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }


  if (normalizedPath === "/signup" && user) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return intlMiddleware(request, { response });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
