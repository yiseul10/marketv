import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    query: { id },
    session: { user }
  } = req;
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
  // OR은 빈목록을 반환한다.
  const similarItems = await client.product.findMany({
    take: 4,
    where: {
      OR: title,
      AND: {
        id: {
          not: product?.id
        }
      }
    }
  });
  const isLiked = Boolean(
    await client.favorite.findFirst({
      where: {
        productId: product?.id,
        userId: user?.id
      },
      select: {
        id: true
      }
    })
  );
  console.log(similarItems);
  res.json({ ok: true, product, similarItems, isLiked });
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));
