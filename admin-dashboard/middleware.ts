import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PREFIX = '/admin';
const LOGIN_PATH = '/login';
const AUTH_ROUTES = ['/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // اگر کاربر در صفحه login است، اجازه دهید
  if (AUTH_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // فقط روی مسیرهای admin اعمال شود
  if (!pathname.startsWith(ADMIN_PREFIX)) {
    return NextResponse.next();
  }

  // Middleware نمی‌تواند localStorage را دریافت کند
  // بنابراین middleware رو غیرفعال کردیم
  // authentication را توسط client-side hooks مدیریت می‌کنیم
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
