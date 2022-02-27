import { cls } from '@libs/client/utils';

interface MessageProps {
  message: string;
  name?: string;
  reversed?: boolean;
  avatarUrl?: string;
}

export default function Message({
  message,
  name,
  avatarUrl,
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
        <div className='mb-1 h-8 w-8 rounded-full bg-stone-400' />
        <p className='text-center text-xs text-stone-500'>{name}</p>
      </div>
      <div className='w-1/3 rounded-full border border-stone-300 p-3 text-sm text-stone-700'>
        <p>{message}</p>
      </div>
    </div>
  );
}
