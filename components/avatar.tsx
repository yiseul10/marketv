import Image from 'next/image';

interface Props {
  name?: string;
  details?: Date | String;
  userAvatar?: string | null;
  lg?: boolean;
}

export function Avatar({ name, details, lg, userAvatar }: Props) {
  return (
    <div className='flex items-center'>
      <div
        className={`${
          lg ? ' w-16 h-16' : 'h-12 w-12 bg-stone-200'
        } outline outline-2 outline-offset-2 outline-stone-200 rounded-full relative`}
      >
        {userAvatar ? (
          <Image
            src={`https://imagedelivery.net/dUPbaZcFtQ32zB4tsu9zTQ/${userAvatar}/avatar`}
            className='rounded-full'
            alt='avatar'
            layout='fill'
          />
        ) : (
          <div className='rounded-full bg-stone-300' />
        )}
      </div>

      <div className='ml-4'>
        <p className='text-sm font-medium text-stone-700'>{name}</p>
        <p className='text-xs font-medium text-stone-500'>{details}</p>
      </div>
    </div>
  );
}
