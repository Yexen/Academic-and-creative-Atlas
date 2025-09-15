// middleware.ts (project root)
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const locales = ['en', 'fr', 'fa'];
const DEFAULT = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore Next internals and files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // files like /favicon.ico
  ) return;

  const pathLocale = pathname.split('/')[1];

  if (!locales.includes(pathLocale)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT}${pathname}`;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
