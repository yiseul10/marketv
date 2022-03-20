import type { NextPage } from 'next';
import CircleBtn from '@components/circleBtn';
import Items from '@components/items';
import Layout from '@components/layout';
import useSWR, { SWRConfig } from 'swr';
import { Product } from '@prisma/client';
import { useState } from 'react';
import client from '@libs/server/client';

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
              image={product.image}
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

// 서버사이드로 데이터를 받아 그걸 캐시데이터의 초기상태로 준다.
// SWRConfig는 fallback이라는 property로 캐시초기값을 설정한다.
// 홈 컴포넌트가 /api/products?page=${pageIndex}를 키로 캐시데이터를 가져온다.
// 그런데 페이지컴포넌트 안에서 초기값을 설정해줬기 때문에 이것은 서버에서 받아온 데이터
// 서버사이드의 로딩화면을 안보여주면서 캐싱기능, 리로딩기능을 사용할 수 있는 방법이라 할 수 있다.
// 초기로딩상태가 길어지기 때문에 데이터를 모두 받아와서 보여주는 게 맞는걸까? 🤔

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
