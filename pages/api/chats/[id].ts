import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
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

export default withApiSession(withHandler({ methods: ['POST'], handler }));
