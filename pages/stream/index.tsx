import { NextPage } from 'next';
import Link from 'next/link';
import CircleBtn from '../../components/circleBtn';
import Layout from '../../components/layout';

const Stream: NextPage = () => {
  return (
    <Layout title='라이브'>
      <div className='w-full flex-col divide-y-[1px]'>
        {[1, 1, 1, 1].map((_, i) => (
          <Link href={`/stream/${i}`} key={i} passHref>
            <div className='cursor-pointer items-center p-4 '>
              <div className='flex aspect-video rounded-md bg-slate-300' />
              <p className='mt-4 text-2xl font-bold'>Title</p>
              <p>abc</p>
            </div>
          </Link>
        ))}

        <CircleBtn href='/stream/upload'>
          <svg
            className='h-6 w-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
            ></path>
          </svg>
        </CircleBtn>
      </div>
    </Layout>
  );
};

export default Stream;
