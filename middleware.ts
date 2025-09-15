// middleware.ts at project root
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'fr', 'fa'];
const DEFAULT = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next internals
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/api')
  ) {
    return;
  }

  // Check if the first segment is already a locale
  const pathLocale = pathname.split('/')[1];
  if (!locales.includes(pathLocale)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT}${pathname}`;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/((?!_next|api).*)'],
};
