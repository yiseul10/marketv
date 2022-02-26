import { NextPage } from 'next';
import { Avatar } from '../../components/avatar';
import CircleBtn from '../../components/circleBtn';

import Layout from '../../components/layout';
import RoundedBtn from '../../components/roundedBtn';
import { TextArea } from '../../components/textArea';

const Index: NextPage = () => {
  return (
    <Layout title='게시판'>
      <div className='flex-col '>
        <span className='m-4 mb-0 inline-flex items-center bg-teal-500 px-1 text-xs font-medium'>
          질문있어요
        </span>

        <div className='flex cursor-pointer items-center space-x-3 border-b p-4'>
          <Avatar name='자몽이' details='2시간 전' />
        </div>

        <div className='border-b-[2px] p-4'>
          <span className='font-medium'>Q. 씐나는 음악?</span>

          <div className='flex space-x-5 pt-4 text-sm text-stone-600'>
            <span className='flex items-center space-x-2'>
              <svg
                className='h-4 w-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
              <span>궁금해요 1</span>
            </span>
            <span className='flex items-center space-x-2'>
              <svg
                className='h-4 w-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                ></path>
              </svg>
              <span>답변 1</span>
            </span>
          </div>
        </div>
        <div className='space-y-5 p-4'>
          <div className='flex items-start space-x-3'>
            <Avatar name='Taem' details='1시간 전' />
          </div>
          <p>어드바이스 들으세요</p>
          <TextArea placeholder='같이 고민해봐요.' />
          <RoundedBtn text='답변 남기기' />
        </div>
      </div>
      <CircleBtn href='/community/write'>
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
    </Layout>
  );
};

export default Index;
