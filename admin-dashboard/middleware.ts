import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

type JWTPayload = {
  exp: number;
  is_staff?: boolean;
};

const ADMIN_PREFIX = '/admin';
const LOGIN_PATH = '/login';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // فقط روی مسیرهای admin اعمال شود
  if (!pathname.startsWith(ADMIN_PREFIX)) {
    return NextResponse.next();
  }

  // تلاش برای گرفتن توکن از Cookie
  const token = request.cookies.get('access_token')?.value;

  // اگر توکن وجود ندارد → login
  if (!token) {
    return redirectToLogin(request);
  }

  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const now = Date.now() / 1000;

    // توکن منقضی شده
    if (!decoded.exp || decoded.exp < now) {
      return redirectToLogin(request);
    }

    // اگر نقش ادمین نیست
    if (!decoded.is_staff) {
      return redirectToLogin(request);
    }

    return NextResponse.next();
  } catch {
    return redirectToLogin(request);
  }
}

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = LOGIN_PATH;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin/:path*'],
};
