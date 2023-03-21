import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const reqPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    url.search = `p=${reqPage}`;

    return NextResponse.redirect(url)
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/address', '/checkout/summary']
}
