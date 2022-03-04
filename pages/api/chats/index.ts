import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    query: { id },
    session: { user }
  } = req;
  const messages = await client.message.findMany({
    where: {
      createdForId: user?.id
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
    messages
  });
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));
