import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Handle admin route protection
  if (pathname === '/admin' && !pathname.includes('/login')) {
    // Check if user is trying to access admin without being on login page
    // The actual authentication check will be done client-side in AdminAuth component
    return NextResponse.next();
  }

  // Handle admin login route
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
