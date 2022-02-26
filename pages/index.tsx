import type { NextPage } from 'next';
import CircleBtn from '@components/circleBtn';
import Items from '@components/items';
import Layout from '@components/layout';

const Home: NextPage = () => {
  return (
    <Layout title='홈'>
      <main>
        <div className='w-full flex-col divide-y-[1px]'>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
            <Items
              key={i}
              id={i}
              title='사과 팔아요'
              details='맛있어용'
              price={5000}
              like={2}
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
