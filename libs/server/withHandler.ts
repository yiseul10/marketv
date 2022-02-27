import { NextApiRequest, NextApiResponse } from 'next';

export type Response = {
  ok: boolean;
  [key: string]: any;
};
interface PropsType {
  method: 'GET' | 'POST' | 'DELETE';
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({
  method,
  isPrivate = true,
  handler
}: PropsType) {
  // 실행할 함수 method validation
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method !== method) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: '로그인 해 주세요.' });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}

/* 함수를 다시 리턴하는 핸들러fn. 반복되는 작업을 피하기 위해 한번 감싸주는 형태
405 bad request 
401 Unauthorized 인증되지 않음
500 Internal Server Error 구체적이지않은 서버에러 */
