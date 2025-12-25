import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('access');

  if (!token && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
