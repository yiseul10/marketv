import { useRouter } from 'next/router';
import Nav from './nav';
import Link from 'next/link';
import { Avatar } from './avatar';
import useUser from '@libs/client/useUser';
import Head from 'next/head';

interface LayoutProps {
  title?: string;
  text?: string;
  back?: boolean;
  children: React.ReactNode;
}

export default function Layout({ title, text, back, children }: LayoutProps) {
  const { user } = useUser();
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div className='mx-auto flex min-h-screen w-full max-w-4xl pb-20 lg:border-r-[1px]'>
      <Head>
        <title>마켓</title>
      </Head>
      <Nav />
      <div className='w-full lg:pl-16'>
        <div
          className={`${
            title ? 'border-b-[1px]' : ''
          } flex items-center p-4 justify-between`}
        >
          {back && (
            <div className='flex items-center space-x-3'>
              <button className='text-2xl text-stone-700' onClick={onClick}>
                &larr;
              </button>
              <p className='-m-2 text-sm'>{text}</p>
            </div>
          )}
          {title && <span className='flex text-xl font-semibold'>{title}</span>}
          <Link href='/profile' passHref>
            <button className='cursor-pointer lg:hidden block'>
              <Avatar userAvatar={user?.avatar} />
            </button>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
