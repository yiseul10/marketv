import { NextPage } from 'next';
import Link from 'next/link';
import { Avatar } from '@components/avatar';
import Layout from '@components/layout';
import useSWR from 'swr';
import { Message, User } from '@prisma/client';
import useUser from '@libs/client/useUser';

interface ChatsWith extends Message {
  createdBy: User;
}

interface Chats {
  ok: boolean;
  messages: ChatsWith[];
}
const Chats: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<Chats>('/api/chats');
  return (
    <Layout title='문의'>
      <div className='w-full flex-col '>
        {/* user.id가 createdBy와 다를때만 보여준다. */}
        {data?.messages.map(message => (
          <div key={message.id} className='divide-y-[1px]'>
            {message.createdById !== user?.id ? (
              <Link href={`/chats/${message.productId}`} passHref>
                <div className='flex cursor-pointer items-center space-x-3 p-4'>
                  <Avatar
                    userAvatar={message.createdBy.avatar}
                    name={message.createdBy.name}
                    details={message.message}
                  />
                </div>
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
