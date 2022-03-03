import { cls } from '@libs/client/utils';
import Link from 'next/link';

interface Props {
  name?: string;
  details?: Date | String;
  lg?: boolean;
}

export function Avatar({ name, details, lg }: Props) {
  return (
    <>
      <div
        className={cls(
          lg ? 'h-16 w-16' : 'h-10 w-10',
          ' rounded-full bg-stone-300'
        )}
      />
      {/* <Link href='' passHref> */}
      <div>
        <p className='text-sm font-medium text-stone-700'>{name}</p>
        <p className='text-xs font-medium text-stone-500'>{details}</p>
      </div>
      {/* </Link> */}
    </>
  );
}
