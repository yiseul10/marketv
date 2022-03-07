import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

// 사용자에게 cloud URL을 전달하는 핸들러 -
async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUD_ID}/images/v2/direct_upload`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.CLOUD_KEY}`
        }
      }
    )
  ).json();
  console.log(response);
  res.json({
    ok: true,
    ...response.result
  });
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));
