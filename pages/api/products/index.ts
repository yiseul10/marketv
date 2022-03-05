import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'GET') {
    const { query } = req;
    const total = +query.page - 1;
    const products = await client.product.findMany({
      take: 10,
      skip: total * 10,
      include: {
        _count: {
          select: {
            favorite: true
          }
        }
      }
    });
    const pageCount = await client.product.count();
    res.json({
      ok: true,
      products,
      pageCount
    });
  }

  if (req.method === 'POST') {
    const { name, price, desc } = req.body;
    const { user } = req.session;
    const product = await client.product.create({
      data: {
        name,
        price: +price,
        desc,
        image: 'imgURL',
        user: {
          connect: {
            id: user?.id
          }
        }
      }
    });

    res.json({
      ok: true,
      product
    });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
