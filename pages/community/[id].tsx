import useMutation from '@libs/client/useMutation';
import { Post, User, Answer } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { Avatar } from '@components/avatar';
import Layout from '@components/layout';
import RoundedBtn from '@components/roundedBtn';
import { TextArea } from '@components/textArea';
import { useEffect } from 'react';

interface AnswerWith extends Answer {
  user: User;
}
interface PostWith extends Post {
  user: User;
  _count: {
    interest: number;
    answers: number;
  };
  answers: AnswerWith[];
}
interface PostResponse {
  ok: boolean;
  post: PostWith;
  interesting: boolean;
}
interface AnswerForm {
  answer: string;
}
interface AnswerResponse {
  ok: boolean;
  answer: Answer;
}

const Board: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<AnswerForm>();
  const { data, mutate } = useSWR<PostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );
  const [interest, { loading }] = useMutation(
    `/api/posts/${router.query.id}/interest`
  );
  const [reply, { data: replyData, loading: replyLoading }] =
    useMutation<AnswerResponse>(`/api/posts/${router.query.id}/reply`);

  // loading중일 때 이중 submit을 방지
  const onInterest = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            interest: data?.interesting
              ? data?.post._count.interest - 1
              : data?.post._count.interest + 1
          }
        },
        interesting: !data.interesting
      },
      false
    );
    if (!loading) interest({});
  };
  const onValid = (form: AnswerForm) => {
    if (replyLoading) return;
    reply(form);
  };
  // 응답이 ok가 되면 폼을 리셋
  useEffect(() => {
    if (replyData && replyData.ok) reset();
  }, [replyData, reset]);

  return (
    <Layout text='Q & A' back>
      <div className='flex-col'>
        <span className='m-4 mb-0 inline-flex items-center bg-teal-500 px-1 text-xs font-medium'>
          질문있어요
        </span>
        <div className='flex cursor-pointer items-center space-x-3 border-b p-4'>
          <Avatar name={data?.post?.user.name} details='판매자정보 &rarr;' />
        </div>

        <div className='border-b-[2px] p-4'>
          <span className='font-medium'>Q. {data?.post?.question}</span>

          <div className='flex space-x-5 pt-4 text-sm text-stone-700'>
            <button
              className='flex items-center space-x-2 '
              onClick={onInterest}
            >
              {data?.interesting ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
              ) : (
                <svg
                  className='h-4 w-4'
                  fill='none'
                  stroke={data?.interesting ? 'orange' : 'currentColor'}
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
              )}

              <span>궁금해요 {data?.post?._count?.interest}</span>
            </button>

            <button className='flex items-center space-x-2'>
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
              <span>답변 {data?.post?._count?.answers}</span>
            </button>
          </div>
        </div>

        {data?.post?.answers?.map(answer => (
          <div key={answer.id} className='space-y-5 p-4'>
            <div className='flex items-start space-x-3'>
              <Avatar name={answer.user.name} details={answer.createdAt} />
            </div>
            <p>{answer.answer}</p>
            <form onSubmit={handleSubmit(onValid)}>
              <TextArea
                register={register('answer', { required: true })}
                placeholder='같이 고민해봐요.'
                required
              />
              <RoundedBtn text={replyLoading ? 'Loading...' : '답변 남기기'} />
            </form>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Board;
