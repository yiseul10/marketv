import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { token } = req.body;
  const tokenFound = await client.token.findUnique({
    where: {
      payload: token
    }
  });
  if (!tokenFound) return res.status(404).end();
  // 토큰이 존재하면 그 토큰의 유저id를 req.session.user에 담음
  req.session.user = {
    id: tokenFound.userId
  };
  // 세션저장
  // tokenFound 모두삭제
  await req.session.save();
  await client.token.deleteMany({
    where: {
      userId: tokenFound.userId
    }
  });
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ['POST'], handler, isPrivate: false })
);
