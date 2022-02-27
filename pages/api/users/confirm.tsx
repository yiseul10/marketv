import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { token } = req.body;
  console.log(token);
  res.status(200).end();
}

export default withHandler('POST', handler);
