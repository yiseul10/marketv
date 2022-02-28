import { NextPage } from 'next';
import { Avatar } from '@components/avatar';
import Layout from '@components/layout';
import RoundedBtn from '@components/roundedBtn';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { Product, User } from '@prisma/client';
import Link from 'next/link';
import useMutation from '@libs/client/useMutation';
import { cls } from '@libs/client/utils';
import products from 'pages/api/products';
import useUser from '@libs/client/useUser';

interface DetailWith extends Product {
  user: User;
}

interface DetailProps {
  ok: boolean;
  product: DetailWith;
  similarItems: Product[];
  isLiked: boolean;
}

const Detail: NextPage = () => {
  const router = useRouter();
  const { data, mutate: boundMutate } = useSWR<DetailProps>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  const [toggleFav] = useMutation(`/api/products/${router.query.id}/favorite`);
  const onFavorite = () => {
    // 데이터가 없는 상태가 될 수 있기 때문에
    if (!data) return;
    boundMutate({ ...data, isLiked: !data.isLiked }, false);
    // 데이터-유무 / 빈 객체를 넣어주어 body가 비어있는  post요청이 되도록
    toggleFav({});
  };

  return (
    <Layout back>
      <div className='px-4'>
        <div className='h-96 bg-stone-300' />
        <div className='flex cursor-pointer items-center space-x-3 border-t border-b py-3'>
          <Avatar
            name={data?.product?.user?.name}
            details='판매자정보 &rarr;'
          />
        </div>
        <div>
          <div className='mt-6 space-y-5'>
            <header className='mr-5 flex justify-between'>
              <h1 className='text-3xl font-bold text-stone-900'>
                {data?.product?.name}
              </h1>
              <button
                onClick={onFavorite}
                className={
                  data?.isLiked
                    ? 'text-stone-900'
                    : 'text-stone-400 hover:opacity-80'
                }
              >
                <svg
                  className='h-6 w-6 '
                  xmlns='http://www.w3.org/2000/svg'
                  // fill='none'
                  // 데이터변화에 따라 움직인다.
                  fill={data?.isLiked ? 'currentColor' : 'none'}
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
              </button>
            </header>
            <span className='block text-3xl text-stone-900'>
              {data?.product?.price}원
            </span>
            <p className='my-3 text-stone-700'>{data?.product?.desc}</p>
            <RoundedBtn text='구매문의' />
          </div>
        </div>
        <h2 className='pt-12'>다음 상품을 추천합니다.</h2>
        <div className='mt-3 grid grid-cols-2 gap-4'>
          {data?.similarItems.map(product => (
            <Link href={`/products/${product.id}`} passHref key={product.id}>
              <div className='cursor-pointer'>
                <div className='h-56 w-full bg-stone-300' />
                <p className='mt-3 text-stone-700'>{product.name}</p>
                <p className='text-sm font-medium text-stone-900'>
                  {product.price}원
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
