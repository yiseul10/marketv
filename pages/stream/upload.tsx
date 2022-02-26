import { NextPage } from 'next';
import Layout from '../../components/layout';

const UploadVideo: NextPage = () => {
  return (
    <Layout>
      <div className='space-y-5 px-4 py-16 text-stone-800'>
        <label className='flex h-48 w-full cursor-pointer items-center justify-center rounded-md bg-stone-100 text-stone-600 hover:border-stone-900'>
          <svg
            className='h-10 w-10'
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

          <input className='hidden' type='file' />
        </label>
        <div className='pt-6'>
          <label className='text-sm font-medium' htmlFor='price'>
            판매 가격
          </label>
          <div className='relative flex items-center rounded-md text-stone-400'>
            <input
              id='price'
              className='w-full rounded-md border-stone-300 px-3 py-2 text-sm placeholder-stone-400'
              type='text'
              placeholder='판매가'
              required
            />
            <div className='pointer-events-none absolute right-0 flex items-center pr-3'>
              <span>원</span>
            </div>
          </div>
        </div>
        <div>
          <label className='text-sm font-medium'>상품 설명</label>
          <textarea
            className='w-full rounded-md border-stone-300'
            rows={4}
            required
          />
        </div>
        <button className='w-full rounded-md bg-stone-900 p-3 text-sm text-white hover:opacity-90'>
          파일 올리기
        </button>
      </div>
    </Layout>
  );
};

export default UploadVideo;
