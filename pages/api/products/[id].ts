import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { id } = req.query;
  const product = await client.product.findUnique({
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
      }
    }
  });
  // 상품명으로 유사상품 검색
  const title = product?.name.split(' ').map(word => ({
    name: {
      contains: word
    }
  }));
  const similarItems = await client.product.findMany({
    where: {
      OR: title,
      AND: {
        id: {
          not: product?.id
        }
      }
    }
  });
  console.log(similarItems);
  res.json({ ok: true, product, similarItems });
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));
