import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'GET') {
    const profile = await client.user.findUnique({
      where: { id: req.session.user?.id }
    });

    res.json({
      ok: true,
      profile
    });
  }
  if (req.method === 'POST') {
    const {
      session: { user },
      body: { email, phone, name, avatarId }
    } = req;
    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id
      }
    });

    // 이메일이 고유한지 확인한다.
    if (email && email !== currentUser?.email) {
      const exist = Boolean(
        await client.user.findUnique({
          where: {
            email
          },
          select: {
            id: true
          }
        })
      );
      if (exist) {
        return res.json({ ok: false, error: '사용중인 이메일입니다.' });
      }
      await client.user.update({
        where: {
          id: user?.id
        },
        data: {
          email
        }
      });
      res.json({ ok: true });
    }
    if (phone) {
      await client.user.update({
        where: {
          id: user?.id
        },
        data: {
          phone
        }
      });
    }
    res.json({ ok: true });
    if (name) {
      await client.user.update({
        where: {
          id: user?.id
        },
        data: {
          name
        }
      });
    }

    if (avatarId) {
      await client.user.update({
        where: {
          id: user?.id
        },
        data: {
          avatar: avatarId
        }
      });
    }
    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
