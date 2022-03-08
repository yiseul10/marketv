import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'GET') {
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
            id: true
          }
        },
        _count: {
          select: {
            interest: true,
            answers: true
          }
        }
      }
    });

    res.json({
      ok: true,
      posts
    });
  }

  if (req.method === 'POST') {
    const {
      body: { question },
      session: { user }
    } = req;
    const post = await client.post.create({
      data: {
        question,
        user: {
          connect: {
            id: user?.id
          }
        }
      }
    });
    res.json({
      ok: true,
      post
    });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
