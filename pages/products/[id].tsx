import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Avatar } from '@components/avatar';
import Layout from '@components/layout';
import RoundedBtn from '@components/roundedBtn';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Product, User } from '@prisma/client';
import Link from 'next/link';
import useMutation from '@libs/client/useMutation';
import Image from 'next/image';
import client from '@libs/server/client';

interface DetailWith extends Product {
  user: User;
}

interface DetailProps {
  ok: boolean;
  product: DetailWith;
  similarItems: Product[];
  isLiked: boolean;
}

const Detail: NextPage<DetailProps> = ({ product, similarItems, isLiked }) => {
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

  // 최초방문자만 보는 fallback
  if (router.isFallback) {
    return (
      <Layout>
        <span>🚧 페이지 생성중 🏃🏻</span>
      </Layout>
    );
  }

  return (
    <Layout back>
      <div className='px-4'>
        <div className='relative pb-80'>
          {isValidating ? (
            ''
          ) : (
            <Image
              src={`https://imagedelivery.net/dUPbaZcFtQ32zB4tsu9zTQ/${product.image}/public`}
              className='object-scale-down'
              alt='product image'
              layout='fill'
            />
          )}
        </div>
        <div className='flex cursor-pointer border-b p-4 -mx-4'>
          <Link href={`/profile/${product.id}`} passHref>
            <div className='flex space-x-3 items-center'>
              <Avatar
                name={product?.user?.name}
                userAvatar={product.user.avatar}
                details='판매자정보 &rarr;'
              />
            </div>
          </Link>
        </div>
        <div>
          <div className='mt-6 space-y-5'>
            <header className='mr-5 flex justify-between'>
              <h1 className='text-3xl font-bold text-stone-900'>
                {product?.name}
              </h1>
              <button
                onClick={onFavorite}
                className={
                  isLiked ? 'text-stone-900' : 'text-stone-400 hover:opacity-80'
                }
              >
                <svg
                  className='h-6 w-6 '
                  xmlns='http://www.w3.org/2000/svg'
                  fill={isLiked ? 'currentColor' : 'none'}
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
              {product?.price}원
            </span>
            <p className='my-3 text-stone-700'>{product?.desc}</p>
            <Link href={`/chats/${product.id}`} passHref>
              <RoundedBtn onClick={() => handleChats(data)} text='구매문의' />
            </Link>
          </div>
        </div>
        <h2 className='pt-12'>다음 상품을 추천합니다.</h2>
        <div className='mt-3 grid grid-cols-2 gap-4'>
          {similarItems.map(product => (
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

// prisma(db)를 통해 모든 데이터를 가져오진 않는다. html을 생성하는 대신 fallback을 이용한다.
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ctx => {
  if (!ctx?.params?.id) {
    return {
      props: {}
    };
  }
  const product = await client.product.findUnique({
    where: {
      id: +ctx.params.id.toString()
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      }
    }
  });
  // 상품명으로 유사상품 검색
  const title = product?.name.split(' ').map(word => ({
    name: {
      contains: word
    }
  }));
  // OR은 빈목록을 반환한다.
  const similarItems = await client.product.findMany({
    take: 4,
    where: {
      OR: title,
      AND: {
        id: {
          not: product?.id
        }
      }
    }
  });
  const isLiked = false;
  // Boolean(
  // await client.favorite.findFirst({
  //   where: {
  //     productId: product?.id,
  //     userId: user?.id
  //   },
  //   select: {
  //     id: true
  //   }
  // })
  // );
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      similarItems: JSON.parse(JSON.stringify(similarItems)),
      isLiked
    }
  };
};
export default Detail;
