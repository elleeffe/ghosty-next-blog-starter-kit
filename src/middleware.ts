import {NextRequest} from 'next/server';
import acceptLanguage from 'accept-language';
import {fallbackLng, languages} from './config';

acceptLanguage.languages(languages);

export function middleware(req: NextRequest) {
  // Check if there is any supported locale in the pathname
  const {pathname} = req.nextUrl;

  const pathnameHasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  // Redirect if there is no locale
  const lng =
    acceptLanguage.get(req.headers.get('Accept-Language')) || fallbackLng;
  req.nextUrl.pathname = `/${lng}${pathname}`;

  const url = req.nextUrl.clone();
  url.pathname = `/${lng}${url.pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return Response.redirect(req.nextUrl);
}

export const config = {
  matcher: [
    '/((?!_next|assets).*)', // Exclude /_next and /assets from the middleware
  ],
};
