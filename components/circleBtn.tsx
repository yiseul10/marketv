import React from 'react';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  href: string;
}

export default function CircleBtn({ children, href }: Props) {
  return (
    <Link href={href} passHref>
      <button className='fixed lg:bottom-8 right-7 bottom-20 cursor-pointer rounded-full bg-stone-900 p-4 text-white drop-shadow-xl transition-colors'>
        {children}
      </button>
    </Link>
  );
}
