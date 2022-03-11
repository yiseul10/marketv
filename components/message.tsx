import { cls } from '@libs/client/utils';
import Image from 'next/image';

interface MessageProps {
  message?: string;
  name?: string;
  reversed?: boolean;
  reversedAvatar?: boolean;
  userAvatar?: string | null;
}

export default function Messages({
  message,
  name,
  userAvatar,
  reversedAvatar,
  reversed
}: MessageProps) {
  return (
    <div
      className={cls(
        'flex items-start space-x-2',
        reversed ? 'flex-row-reverse space-x-reverse' : ''
      )}
    >
      <div>
        {reversedAvatar ? (
          <Image
            src={`https://imagedelivery.net/dUPbaZcFtQ32zB4tsu9zTQ/${userAvatar}/avatar`}
            className='rounded-full'
            alt='avatar'
            width={42}
            height={42}
          />
        ) : (
          <div className='mb-1 h-8 w-8 rounded-full bg-stone-400' />
        )}
        <p className='text-center text-xs text-stone-500'>{name}</p>
      </div>
      <div className='w-1/3 rounded-full border border-stone-300 p-3 text-sm text-stone-700'>
        <p>{message}</p>
      </div>
    </div>
  );
}
