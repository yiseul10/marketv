import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  label?: string;
  name?: string;
  [key: string]: any;
  register: UseFormRegisterReturn;
}

export function TextArea({ label, name, register, ...rest }: Props) {
  return (
    <div>
      {label && (
        <label className='text-sm font-medium' htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        className='w-full rounded-xl border-stone-300 text-sm'
        rows={4}
        {...register}
        {...rest}
      />
    </div>
  );
}
