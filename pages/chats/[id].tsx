import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import Layout from '@components/layout';
import Messages from '@components/message';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Message, User } from '@prisma/client';
import useUser from '@libs/client/useUser';
import { useEffect } from 'react';

interface MessageWith extends Message {
  createdBy: User;
  productId: number;
}

interface MessageResponse {
  ok: true;
  messages: MessageWith[];
}

interface Talk {
  message: string;
}

const ChatDetail: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<Talk>();
  const { data, mutate } = useSWR<MessageResponse>(
    router.query ? `/api/chats` : null
  );
  console.log(data);
  // 데이터 백으로!
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/chats/${router.query.id}`
  );
  const onValid = (text: Talk) => {
    // when the submit,
    if (loading) return;
    reset();
    sendMessage(text);
  };
  useEffect(() => {
    if (sendMessageData && sendMessageData.ok) {
      mutate();
    }
  }, [sendMessageData, mutate]);

  return (
    <Layout text='채팅방나가기' back>
      <div className='space-y-7 p-4'>
        {data?.messages.map(ms => (
          <Messages
            name={ms.createdBy.name}
            message={ms.message}
            key={ms.id}
            reversed={ms.createdById === user?.id}
          />
        ))}

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
