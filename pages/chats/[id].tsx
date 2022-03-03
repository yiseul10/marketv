import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import Layout from '@components/layout';
import Message from '@components/message';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';

interface Message {
  message: string;
}

const ChatDetail: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<Message>();
  // 데이터 백으로!
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/chats/${router.query.id}/messages`
  );
  const onValid = (text: Message) => {
    // when the submit,
    reset();
    console.log(text);
  };
  return (
    <Layout text='채팅방나가기' back>
      <div className='space-y-4 py-10 px-4 pb-16'>
        <Message name='자몽이' message='천원이요.' />
        <Message name='찡구' message='그냥 주세요' reversed />
        <Message name='자몽이' message='아니 이 영감이' />
        <div className='fixed inset-x-0 bottom-0 py-2'>
          <form
            onSubmit={handleSubmit(onValid)}
            className='relative mx-auto flex w-full max-w-md items-center'
          >
            <input
              {...register('message', { required: true })}
              type='text'
              className='w-full rounded-full border border-stone-400 p-3'
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
