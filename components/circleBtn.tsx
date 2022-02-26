import React from 'react';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  href: string;
}

export default function CircleBtn({ children, href }: Props) {
  return (
    <Link href={href} passHref>
      <button className='fixed bottom-8 right-7 cursor-pointer rounded-full bg-stone-900 p-4 text-white shadow-lg transition-colors'>
        {children}
      </button>
    </Link>
  );
}
