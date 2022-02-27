import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { Avatar } from '@components/avatar';
import Layout from '@components/layout';
import { cls } from '@libs/client/utils';

const Profile: NextPage = () => {
  const [menu, setMenu] = useState<'나의판매' | '나의구매' | '관심목록'>(
    '나의판매'
  );
  const onSoldClick = () => setMenu('나의판매');
  const onBuyClick = () => setMenu('나의구매');
  const onWishClick = () => setMenu('관심목록');
  return (
    <Layout title='나의페이지'>
      <div className='flex-col py-10 px-4 '>
        <Link href='/profile/edit' passHref>
          <div className='flex cursor-pointer items-center space-x-3'>
            <Avatar name='자몽이' details='프로필수정 &rarr;' lg />
          </div>
        </Link>

        <div className='-mx-4 flex space-x-7 border-b px-4 pt-10 text-sm font-medium'>
          <Link href='/profile/sell' passHref>
            <button
              className={cls(
                'border-b-2 pb-2',
                menu === '나의판매'
                  ? 'border-stone-800'
                  : 'border-transparent hover:opacity-80'
              )}
              onClick={onSoldClick}
            >
              나의판매
            </button>
          </Link>
          <Link href='/profile/buy' passHref>
            <button
              className={cls(
                'border-b-2 pb-2',
                menu === '나의구매'
                  ? 'border-stone-800'
                  : 'border-transparent hover:opacity-80'
              )}
              onClick={onBuyClick}
            >
              나의구매
            </button>
          </Link>
          <Link href='/profile/wish' passHref>
            <button
              className={cls(
                'border-b-2 pb-2',
                menu === '관심목록'
                  ? 'border-stone-800'
                  : 'border-transparent hover:opacity-80'
              )}
              onClick={onWishClick}
            >
              관심목록
            </button>
          </Link>
        </div>

        <div className='mt-12'>
          <div className='flex items-center space-x-4'>
            <Avatar name='밤이' />
            <div className='flex'>
              <svg
                className='h-5 w-5 text-yellow-400'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
            </div>
          </div>
          <div className='mt-6 text-sm text-stone-800'>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
