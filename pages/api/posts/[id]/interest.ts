import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  // 질문 포스트에 대한 유저정보와 질문 Id
  const {
    query: { id },
    session: { user }
  } = req;

  const exists = await client.interest.findFirst({
    where: {
      postId: +id.toString(),
      userId: user?.id
    },
    select: {
      id: true
    }
  });
  if (exists) {
    await client.interest.delete({
      where: {
        id: exists.id
      }
    });
  } else {
    await client.interest.create({
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
        }
      }
    });
  }
  res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ['POST'], handler }));
