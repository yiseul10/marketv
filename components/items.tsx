import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  details?: string;
  price: number;
  like?: number;
  id: number;
  image?: string | null;
  grid?: boolean;
}

export default function Items({
  title,
  details,
  price,
  like,
  id,
  image,
  grid
}: Props) {
  return (
    <Link href={`/products/${id}`} passHref>
      {grid ? (
        <div className='pb-4 cursor-pointer'>
          <div className='relative pb-72'>
            <Image
              src={`https://imagedelivery.net/dUPbaZcFtQ32zB4tsu9zTQ/${image}/public`}
              className='object-scale-down'
              alt='product image'
              layout='fill'
            />
          </div>
          <div className='flex flex-col mt-2 mx-1'>
            <h3 className='text-lg font-medium '>{title}</h3>
            <span className='text-xs text-stone-500'>{details}</span>
            <div className='flex justify-between'>
              <span>{price}원</span>
              <div className='flex items-center space-x-0.5 text-sm '>
                <svg
                  className='h-4 w-4'
                  fill={like ? 'currentColor' : 'none'}
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.8'
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  ></path>
                </svg>
                <span>{like}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex cursor-pointer justify-between p-4'>
          <div className='flex space-x-4 items-center'>
            <div className='relative'>
              <Image
                src={`https://imagedelivery.net/dUPbaZcFtQ32zB4tsu9zTQ/${image}/public`}
                className='object-cover rounded-lg'
                alt='product image'
                width={110}
                height={79}
              />
            </div>
            <div className='flex flex-col space-y-1'>
              <h3 className='text-sm font-medium text-stone-900'>{title}</h3>
              <span className='text-xs text-stone-500'>{details}</span>
              <span className='mt-1 text-stone-900'>{price}원</span>
            </div>
          </div>
          <div className='flex items-end justify-end space-x-2'>
            <div className='flex items-center space-x-0.5 text-sm  text-stone-600'>
              <svg
                className='h-4 w-4'
                fill={like ? 'currentColor' : 'none'}
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.8'
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                ></path>
              </svg>
              <span>{like}</span>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}
