import type { NextRequest, NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest, fetchev: NextFetchEvent) {
  if (req.ua?.isBot) {
    return new Response('Hey🤖', { status: 403 });
  }
  // 미들웨어는 API요청시에도 실행된다.
  if (!req.url.includes('/api')) {
    // 페이지 리다이렉트 문제 => 쿠키의 존재여부 확인
    if (!req.url.includes('/entrace') && !req.cookies.marketSession) {
      const url = req.nextUrl.clone();
      url.pathname = '/entrace';
      return NextResponse.rewrite(url);
    }
  }
}
