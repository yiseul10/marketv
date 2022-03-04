import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

// TODO productID를 어떻게 줄것인가? 지금은 메세지창 자체의 쿼리값으로 주고 있네요?
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
