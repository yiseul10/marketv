interface Props {
  text: string;
  [key: string]: any;
}

export default function RoundedBtn({ text, ...rest }: Props) {
  return (
    <button
      {...rest}
      className='mt-4 w-full rounded-full bg-stone-900 p-3 text-sm text-white hover:bg-stone-900/90'
    >
      {text}
    </button>
  );
}
