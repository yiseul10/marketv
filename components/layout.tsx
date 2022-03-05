import React from 'react';

import { useRouter } from 'next/router';
import Nav from './nav';
import Link from 'next/link';

interface LayoutProps {
  title?: string;
  text?: string;
  back?: boolean;
  children: React.ReactNode;
}

export default function Layout({ title, text, back, children }: LayoutProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div className='mx-auto flex min-h-screen w-full max-w-4xl pb-20'>
      <Nav />
      <div className='w-full max-w-4xl lg:pl-16 lg:border-r-[1px] '>
        <div className='flex justify-between w-full border-b-[1px] items-center p-4'>
          <Link href='/profile' passHref>
            <button className='cursor-pointer lg:hidden block'>
              <div className='relative h-10 w-10 rounded-full border bg-stone-300' />
            </button>
          </Link>
          {back && (
            <div className='flex items-center'>
              <button className='text-2xl text-stone-700' onClick={onClick}>
                &larr;
              </button>
              <p className='-m-2 text-sm'>{text}</p>
            </div>
          )}
          {title && <span className='flex text-xl font-semibold'>{title}</span>}
        </div>
        {children}
      </div>
    </div>
  );
}
