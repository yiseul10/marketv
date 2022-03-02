import React from 'react';

import { useRouter } from 'next/router';
import Nav from './nav';

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
    <div className='mx-auto flex min-h-screen w-full max-w-4xl'>
      <Nav />
      <div className='w-full max-w-4xl pl-16 lg:border-r-[1px] divide-y-[1px]'>
        {back && (
          <div className='flex items-center'>
            <button className='p-4 text-2xl text-stone-700' onClick={onClick}>
              &larr;
            </button>
            <p className='-m-2 text-sm'>{text}</p>
          </div>
        )}
        {title && (
          <span className='flex p-4 text-lg font-semibold'>{title}</span>
        )}
        {children}
      </div>
    </div>
  );
}
