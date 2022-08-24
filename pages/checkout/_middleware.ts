import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { JWT } from '../../utils';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { token = '' } = req.cookies;
  
  try {
    await JWT.isValidToken(token);
    return NextResponse.next();
  } catch (error) {
    const url = req.nextUrl.clone();
    const reqPage = req.page;
    url.pathname = '/auth/login';
    url.search = `p=${reqPage.name}`;
    return NextResponse.redirect(url)
  }
}