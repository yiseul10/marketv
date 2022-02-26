import { NextPage } from 'next';
import Layout from '../../components/layout';
import Message from '../../components/message';

const ChatDetail: NextPage = () => {
  return (
    <Layout text='채팅방나가기' back>
      <div className='space-y-4 py-10 px-4 pb-16'>
        <Message name='자몽이' message='천원이요.' />
        <Message name='찡구' message='그냥 주세요' reversed />
        <Message name='자몽이' message='아니 이 영감이' />
        <div className='fixed inset-x-0 bottom-0 py-2'>
          <div className='relative mx-auto flex w-full max-w-md items-center'>
            <input
              type='text'
              className='w-full rounded-full border-stone-300 pr-5'
            />
            <div className='absolute inset-y-0 right-0 flex p-1.5'>
              <button></button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
