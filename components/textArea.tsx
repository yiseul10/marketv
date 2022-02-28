import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  label?: string;
  name?: string;
  [key: string]: any;
  register: UseFormRegisterReturn;
}

export function TextArea({ label, name, register, ...rest }: Props) {
  return (
    <div className='text-sm'>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        className='w-full rounded-xl border border-stone-300 px-3 py-2'
        rows={5}
        {...register}
        {...rest}
      />
    </div>
  );
}
