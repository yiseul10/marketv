import type { NextPage } from 'next';
import CircleBtn from '@components/circleBtn';
import Items from '@components/items';
import Layout from '@components/layout';
import useUser from '@libs/client/useUser';
import useSWR, { SWRConfig } from 'swr';
import { Product } from '@prisma/client';
import { useState } from 'react';
import client from '@libs/server/client';
import products from './api/products';

export interface LikeWith extends Product {
  _count: {
    favorite: number;
  };
}

interface ProductType {
  ok: boolean;
  products: LikeWith[];
  pageCount: number;
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const [pageIndex, setPageIndex] = useState(1);
  const { data } = useSWR<ProductType>(`/api/products?page=${pageIndex}`);

  // pagination
  const pageCount = data?.pageCount;
  const pageNum = Math.ceil(pageCount! / 10);
  const page = [];
  for (let i = 0; i < pageNum; i++) {
    page.push(i);
  }
  const pageNext = () => {
    if (pageIndex < page.length) setPageIndex(pageIndex + 1);
  };
  const pagePrev = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  return (
    <Layout title='홈'>
      <main>
        <div className='grid grid-cols-2 gap-4 p-4'>
          {data?.products?.map(product => (
            <Items
              key={product.id}
              id={product.id}
              title={product.name}
              details={product.desc}
              price={product.price}
              like={product._count.favorite}
              grid
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
        <div className='text-center text-sm space-x-4 p-4'>
          <button onClick={pagePrev}>&lsaquo;</button>
          {page.map(num => (
            <button
              className={`${
                pageIndex === num + 1
                  ? 'text-stone-800 font-medium'
                  : 'text-stone-400'
              }`}
              key={num}
              onClick={() => {
                setPageIndex(num + 1);
              }}
            >
              {num + 1}
            </button>
          ))}
          <button onClick={pageNext}>&rsaquo;</button>
        </div>
      </main>
    </Layout>
  );
};
// `data`는 `fallback`에 있기 때문에 항상 사용할 수 있습니다..
const Page: NextPage<{ products: LikeWith[]; pageCount: number }> = ({
  products,
  pageCount
}) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          '/api/products?page=${pageIndex}': {
            ok: true,
            products,
            pageCount
          }
        }
      }}
    >
      <Home />
    </SWRConfig>
  );
};
export async function getServerSideProps() {
  const products = await client.product.findMany({});
  const pageCount = await client.product.count();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      pageCount: JSON.parse(JSON.stringify(pageCount))
    }
  };
}

export default Page;
