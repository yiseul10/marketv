import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    session: { user }
  } = req;
  const reviews = await client.review.findMany({
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
    reviews
  });
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));
