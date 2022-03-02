import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    session: { user }
  } = req;
  const purchases = await client.purchase.findMany({
    where: {
      userId: user?.id
    },
    include: {
      product: {
        include: {
          _count: {
            select: {
              favorite: true
            }
          }
        }
      }
    }
  });
  res.json({
    ok: true,
    purchases
  });
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));
