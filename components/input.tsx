import type { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  label: string;
  name: string;
  kind?: 'phone' | 'price' | 'text';
  type: string;
  required: boolean;
  register: UseFormRegisterReturn;
}

export default function Input({
  label,
  name,
  kind = 'text',
  type,
  required,
  register
}: Props) {
  return (
    <div>
      <label className='text-sm' htmlFor={name}>
        {label}
      </label>
      {kind === 'price' ? (
        <div className='relative flex items-center rounded-md'>
          <input
            className='w-full rounded-full border border-stone-300 px-3 py-2 text-sm placeholder-stone-400'
            placeholder='판매가'
            id={name}
            type={type}
            required={required}
            {...register}
          />
          <div className='pointer-events-none absolute right-0 flex items-center pr-3 text-stone-400'>
            <span>원</span>
          </div>
        </div>
      ) : null}
      {kind === 'phone' ? (
        <div className='flex rounded-full'>
          <span className='flex items-center justify-center rounded-l-full border border-r-0 border-stone-300 px-3 text-sm text-stone-600'>
            +82
          </span>
          <input
            className='w-full rounded-full rounded-l-none border border-stone-300 p-2 placeholder-gray-400 shadow-sm'
            id={name}
            type={type}
            required={required}
            {...register}
          />
        </div>
      ) : null}
      {kind === 'text' ? (
        <input
          className='w-full rounded-full border border-stone-300 px-3 py-2 text-sm'
          id={name}
          type={type}
          required={required}
          {...register}
        />
      ) : null}
    </div>
  );
}
