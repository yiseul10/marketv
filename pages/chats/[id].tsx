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
  message: string;
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
    router.query ? `/api/chats` : null,
    { refreshInterval: 1000 }
  );
  console.log(data);
  // 데이터 백으로!
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/chats/${router.query.id}`
  );
  // when the submit,
  const onValid = (text: Talk) => {
    if (loading) return;
    reset();
    mutate(
      prev =>
        prev &&
        ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: Date.now(),
              // productId: 2,
              // createdForId: user?.id,
              createdById: user?.id,
              message: text.message,
              createdBy: {
                ...user
              }
            }
          ]
        } as any),
      false
    );
    sendMessage(text);
  };

  return (
    <Layout text='채팅방나가기' back>
      <div className='space-y-7 p-4'>
        {data?.messages.map(ms => (
          <Messages
            key={ms.id}
            name={ms.createdBy.name}
            message={ms.message}
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
