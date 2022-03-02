import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { Avatar } from '@components/avatar';
import Layout from '@components/layout';
import { cls } from '@libs/client/utils';
import useUser from '@libs/client/useUser';
import useSWR from 'swr';
import { Review, User } from '@prisma/client';

interface ReviewWith extends Review {
  createdBy: User;
}

interface Reviews {
  ok: boolean;
  reviews: ReviewWith[];
}

const Profile: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<Reviews>('/api/reviews');
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
            <Avatar name={user?.name} details='프로필수정 &rarr;' lg />
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
          <Link href='/profile/purchase' passHref>
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
          <Link href='/profile/favorite' passHref>
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
        {data?.reviews.map(review => (
          <div className='mt-12' key={review.id}>
            <div className='flex items-center space-x-4'>
              <Avatar name={review.createdBy.name} />
              <div className='flex'>
                {[1, 2, 3, 4, 5].map(score => (
                  <svg
                    key={score}
                    className={`${
                      review.score >= score
                        ? 'text-yellow-400'
                        : 'text-stone-200'
                    } h-5 w-5`}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>
            </div>
            <div className='mt-6 text-sm text-stone-800'>
              <p>{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Profile;
