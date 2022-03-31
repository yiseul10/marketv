import { NextPage } from 'next';
import { Avatar } from '@components/avatar';
import Layout from '@components/layout';
import RoundedBtn from '@components/roundedBtn';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Product, User } from '@prisma/client';
import Link from 'next/link';
import useMutation from '@libs/client/useMutation';
import Image from 'next/image';

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
  const {
    data,
    isValidating,
    mutate: boundMutate
  } = useSWR<DetailProps>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  const [toggleFav] = useMutation(`/api/products/${router.query.id}/favorite`);
  const [newChat] = useMutation(`api/chats/${router.query.id}`);

  const onFavorite = () => {
    if (!data) return;
    boundMutate({ ...data, isLiked: !data.isLiked }, false);
    // 데이터-유무 / 빈 객체를 넣어주어 body가 비어있는 post요청이 되도록
    toggleFav({});
  };

  // 1. 온클릭 -> 포스트요청, 메세지는 없는 새로운 채팅방이 만들어진다.
  const handleChats = (data?: DetailProps) => {
    if (!data) return;
    console.log(data);
    newChat(data);
  };

  return (
    <Layout back>
      <div className='px-4'>
        <div className='relative pb-80'>
          {isValidating ? (
            ''
          ) : (
            <Image
              src={`https://imagedelivery.net/dUPbaZcFtQ32zB4tsu9zTQ/${data?.product.image}/public`}
              className='object-scale-down'
              alt='product image'
              layout='fill'
            />
          )}
        </div>
        <div className='flex cursor-pointer border-b p-4 -mx-4'>
          <Link href={`/profile/${data?.product.id}`} passHref>
            <div className='flex space-x-3 items-center'>
              <Avatar
                name={data?.product?.user?.name}
                userAvatar={data?.product.user.avatar}
                details='판매자정보 &rarr;'
              />
            </div>
          </Link>
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
            <Link href={`/chats/${data?.product.id}`} passHref>
              <RoundedBtn onClick={() => handleChats(data)} text='구매문의' />
            </Link>
          </div>
        </div>
        <h2 className='pt-12'>다음 상품을 추천합니다.</h2>
        <div className='mt-3 grid grid-cols-2 gap-4'>
          {data?.similarItems.map(product => (
            <Link href={`/products/${product.id}`} passHref key={product.id}>
              <div className='cursor-pointer'>
                <div className='relative pb-64'>
                  <Image
                    src={`https://imagedelivery.net/dUPbaZcFtQ32zB4tsu9zTQ/${product.image}/public`}
                    className='object-scale-down'
                    alt='product image'
                    layout='fill'
                  />
                </div>
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
