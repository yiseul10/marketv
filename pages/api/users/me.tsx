import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  console.log(req.session.user);
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id }
  });

  res.json({
    ok: true,
    profile
  });
}

export default withApiSession(withHandler('GET', handler));
