import useUser from '@libs/client/useUser';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Avatar } from './avatar';

const Nav: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className='fixed lg:min-h-screen lg:w-16 lg:border-r-[1px] pt-4 h-16 bottom-0 bg-white/10 backdrop-blur-sm w-full'>
      <div className='flex lg:flex-col lg:place-items-center lg:space-y-7 lg:mr-4  h-2/3 justify-around items-center'>
        <h1 className='text-3xl font-bold lg:inline-block hidden'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-10 w-10'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z'
              clipRule='evenodd'
            />
          </svg>
        </h1>

        <Link href='/' passHref>
          <button>
            <div
              className={`${
                router.pathname === '/'
                  ? 'w-2 h-2 bg-yellow-400 translate-x-6 rounded-full'
                  : ''
              } cursor-pointer`}
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={`${
                router.pathname === '/'
                  ? 'bg-amber-400/5 shadow-xl shadow-amber-400/70 rounded-lg'
                  : ''
              } h-7 w-7`}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.8'
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              />
            </svg>
          </button>
        </Link>
        <Link href='/chats' passHref>
          <button>
            <div
              className={`${
                router.pathname === '/chats'
                  ? 'w-2 h-2 bg-yellow-400 translate-x-6 rounded-full'
                  : ''
              } cursor-pointer`}
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={`${
                router.pathname === '/chats'
                  ? 'bg-amber-400/5 shadow-xl shadow-amber-400/70 rounded-lg'
                  : ''
              } h-7 w-7`}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.8'
                d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
              />
            </svg>
          </button>
        </Link>
        <Link href='/community' passHref>
          <button>
            <div
              className={`${
                router.pathname === '/community'
                  ? 'w-2 h-2 bg-yellow-400 translate-x-6 rounded-full'
                  : ''
              } cursor-pointer`}
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={`${
                router.pathname === '/community'
                  ? 'bg-amber-400/5 shadow-xl shadow-amber-400/70 rounded-lg'
                  : ''
              } h-7 w-7`}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.8'
                d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'
              />
            </svg>
          </button>
        </Link>
        <Link href='/notice' passHref>
          <button>
            <div
              className={`${
                router.pathname === '/notice'
                  ? 'w-2 h-2 bg-yellow-400 translate-x-6 rounded-full'
                  : ''
              } cursor-pointer`}
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={`${
                router.pathname === '/notice'
                  ? 'bg-amber-400/5 shadow-xl shadow-amber-400/70 rounded-lg'
                  : ''
              } h-7 w-7`}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.8'
                d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
              />
            </svg>
          </button>
        </Link>
      </div>
      <Link href='/profile' passHref>
        <button className='cursor-pointer hidden lg:block lg:my-16 '>
          <Avatar userAvatar={user?.avatar} />
        </button>
      </Link>
    </div>
  );
};

export default Nav;
