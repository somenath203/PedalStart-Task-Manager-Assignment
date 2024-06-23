import { NextResponse } from 'next/server';

export function middleware(request) {

  const currentPageURL = request.nextUrl.pathname;

  const authToken = request.cookies.get('token')?.value;

  console.log(authToken);

  const isPublicPagePath = currentPageURL === '/pages/login' || currentPageURL === '/pages/register';

  if (authToken && isPublicPagePath) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!authToken && !isPublicPagePath) {
    return NextResponse.redirect(new URL('/pages/login', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {

  matcher: ['/', '/pages/login', '/pages/register', '/pages/createtask']

};
