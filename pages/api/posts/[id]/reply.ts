import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    query: { id },
    session: { user },
    body: { answer }
  } = req;
  // 해당 post가 없다면, (관심목록에 추가하려는 물건이 있는지 확인해야한다) - 페이지404를 리턴?or
  // if(!post)
  // 답변을 작성하는 유저(세션)의 아이디 & 포스팅과 연결, 답변도 가져온다.
  const reply = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id
        }
      },
      post: {
        connect: {
          id: +id.toString()
        }
      },
      answer
    }
  });
  console.log(reply);
  res.json({ ok: true, reply });
}

export default withApiSession(withHandler({ methods: ['POST'], handler }));
