import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'POST') {
    const {
      query: { id },
      body,
      session: { user }
    } = req;

    const chats = await client.message.create({
      data: {
        message: body.message,
        product: {
          connect: {
            id: +id.toString()
          }
        },
        createdBy: {
          connect: {
            id: user?.id
          }
        },
        createdFor: {
          connect: {
            id: user?.id
          }
        }
      }
    });
    res.json({
      ok: true,
      chats
    });
  }
  if (req.method === 'GET') {
    const {
      query: { id }
    } = req;
    const chats = await client.message.findMany({
      where: {
        id: +id.toString()
      },
      include: {
        createdBy: {
          select: {
            id: true,
            avatar: true,
            name: true
          }
        }
      }
    });
    res.json({
      ok: true,
      chats
    });
  }
}

export default withApiSession(
  withHandler({ methods: ['POST', 'GET'], handler })
);
