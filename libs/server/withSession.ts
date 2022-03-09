import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';

// 변수의 존재를 알리기 위함 declare선언은 컴파일되지 않음
declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOpt = {
  cookieName: 'marketSession',
  password: process.env.COOKIE_KEY!
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOpt);
}

export function withSsrSession(handler: any) {
  return withIronSessionSsr(handler, cookieOpt);
}
