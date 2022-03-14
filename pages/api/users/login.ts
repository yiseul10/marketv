import mail from '@sendgrid/mail';
import client from '@libs/server/client';
import withHandler, { Response } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

mail.setApiKey(process.env.SENDGRID_KEY!);

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    // session: { user },
    body: { email }
  } = req;

  if (!email) return res.status(400).json({ ok: false });
  const payload = Math.floor(10000 + Math.random() * (10000 - 1) + 1) + '';

  if (email) {
    const token = await client.token.create({
      data: {
        payload,
        user: {
          connectOrCreate: {
            where: { email },
            create: { name: 'user1', email }
          }
        }
      }
    });

    /*     const sendEmail = await mail.send({
      from: 'yiseul10@gmail.com',
      to: 'yiseul10@gmail.com',
      subject: '확인 메일입니다.',
      text: `로그인용 토큰은 ${payload}입니다. 🎉`,
      html: `<strong> 로그인용 토큰은 ${payload}입니다. 🎉 </strong>`
    });
    console.log(sendEmail);

  /* if (email) {
    user = await client.user.findUnique({ where: { email } });
   if (!user) {
      console.log('not founded');
      user = await client.user.create({
        data: {
          name: 'user1',
          email
        }
      });
    }  */
  }
  return res.json({ ok: true });
}

export default withHandler({ methods: ['POST'], handler, isPrivate: false });
