import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  // post의 id_num
  const {
    query: { id },
    session: { user }
  } = req;
  const post = await client.post.findUnique({
    where: {
      id: +id.toString()
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      },
      _count: {
        select: {
          interest: true,
          answers: true
        }
      },
      answers: {
        select: {
          answer: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          }
        }
      }
    }
  });
  const interesting = Boolean(
    await client.interest.findFirst({
      where: {
        postId: +id.toString(),
        userId: user?.id
      },
      select: {
        id: true
      }
    })
  );
  res.json({
    ok: true,
    post,
    interesting
  });
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));
