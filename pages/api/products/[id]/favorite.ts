import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  // 상품의 정보 & 유저의 정보
  const {
    query: { id },
    session: { user }
  } = req;

  const exists = await client.favorite.findFirst({
    where: {
      productId: +id.toString(),
      userId: user?.id
    }
  });
  if (exists) {
    await client.favorite.delete({
      where: {
        id: exists.id
      }
    });
  } else {
    await client.favorite.create({
      data: {
        user: {
          connect: {
            id: user?.id
          }
        },
        product: {
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
