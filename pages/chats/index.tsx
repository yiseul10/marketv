import { NextPage } from 'next';
import Link from 'next/link';
import { Avatar } from '@components/avatar';
import Layout from '@components/layout';

const Chats: NextPage = () => {
  return (
    <Layout title='문의'>
      <div className='w-full flex-col divide-y-[1px]'>
        {[1, 1, 1, 1].map((_, i) => (
          <Link href={`/chats/${i}`} key={i} passHref>
            <div className='flex cursor-pointer items-center space-x-3 p-4'>
              <Avatar name='자몽이' details='우리 봄이 오기전에 꼭 만나요.' />
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
