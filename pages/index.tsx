import type { NextPage } from 'next';
import CircleBtn from '@components/circleBtn';
import Items from '@components/items';
import Layout from '@components/layout';
import useUser from '@libs/client/useUser';
import useSWR from 'swr';
import { Product } from '@prisma/client';

interface LikeWith extends Product {
  _count: {
    favorite: number;
  };
}

interface ProductType {
  ok: boolean;
  products: LikeWith[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductType>('/api/products');

  return (
    <Layout title='홈'>
      <main>
        <div className='w-full flex-col divide-y-[1px]'>
          {data?.products?.map(product => (
            <Items
              key={product.id}
              id={product.id}
              title={product.name}
              details={product.desc}
              price={product.price}
              like={product._count.favorite}
              comments={0}
            />
          ))}

          <CircleBtn href='/products/upload'>
            <svg
              className='h-6 w-6'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.8'
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
          </CircleBtn>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
