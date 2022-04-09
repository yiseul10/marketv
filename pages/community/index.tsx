import type { NextPage } from 'next';
import CircleBtn from '@components/circleBtn';
import Layout from '@components/layout';
import Link from 'next/link';
import useSWR from 'swr';
import { Post, User } from '@prisma/client';
import client from '@libs/server/client';

interface PostWith extends Post {
  user: User;
  _count: {
    interest: number;
    answers: number;
  };
}
interface Posts {
  ok: boolean;
  posts: PostWith[];
}

const Community: NextPage<Posts> = ({ posts }) => {
  // const { data, error } = useSWR<Posts>('/api/posts');

  return (
    <Layout title='게시판'>
      <div className='divide-y-[1px]'>
        {posts?.map(post => (
          <Link key={post.id} href={`/community/${post.id}`} passHref>
            <a className='flex cursor-pointer flex-col items-start'>
              <span className='m-4 inline-flex items-center bg-teal-300 px-1 text-xs font-medium'>
                질문있어요
              </span>
              <span className='font-medium px-4 hover:opacity-70'>
                Q. {post.question}
              </span>
              <div className='mt-4 px-4 text-stone-400 text-xs font-medium space-x-1'>
                <span>{`${post.createdAt}`.split('T', 1)}</span>
              </div>
              <div className='flex space-x-5 px-4 py-3 text-sm text-stone-600'>
                <span className='flex items-center space-x-2'>
                  {post._count?.interest ? (
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
                  )}

                  <span>궁금해요 {post?._count?.interest}</span>
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
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg>
                  <span>답변 {post?._count?.answers}</span>
                </span>
              </div>
            </a>
          </Link>
        ))}
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
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = await client.post.findMany({ include: { user: true } });
  console.log('revalidating...');
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
    // revalidate: 20
  };
}

export default Community;
