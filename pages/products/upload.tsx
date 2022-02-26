import { NextPage } from 'next';
import Input from '@components/input';
import Layout from '@components/layout';
import RoundedBtn from '@components/roundedBtn';
import { TextArea } from '@components/textArea';

const Upload: NextPage = () => {
  return (
    <Layout>
      <div className='space-y-5 px-4 py-16 text-stone-800'>
        <label className='flex h-48 w-full cursor-pointer items-center justify-center rounded-md bg-stone-100 text-stone-600 hover:border-stone-900'>
          <svg
            className='h-16 w-16'
            stroke='currentColor'
            fill='none'
            viewBox='0 0 48 48'
            aria-hidden='true'
          >
            <path
              d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <input className='hidden' type='file' />
        </label>
        <Input label='판매가격' name='price' kind='price' />
        <TextArea label='상품설명' name='desc' />
        <RoundedBtn text='파일 올리기' />
      </div>
    </Layout>
  );
};

export default Upload;
