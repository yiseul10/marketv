import type { NextPage } from 'next';
import RoundedBtn from '@components/roundedBtn';
import { useForm } from 'react-hook-form';
import Input from '@components/input';
import { useEffect, useState } from 'react';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';
import Head from 'next/head';

type LoginForm = {
  email: string;
};
type MutationResult = {
  ok: boolean;
};
type TokenForm = {
  token: string;
};

const Login: NextPage = () => {
  const [login, { loading, data, error }] =
    useMutation<MutationResult>('/api/users/login');
  const [confirmToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<MutationResult>('/api/users/confirm');
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<LoginForm>();
  const { register: tokenRegister, handleSubmit: tokenSubmit } =
    useForm<TokenForm>();

  const onValid = (validEmail: LoginForm) => {
    if (loading) return;
    login(validEmail);
  };
  const onTokenValid = (validToken: TokenForm) => {
    if (tokenLoading) return;
    confirmToken(validToken);
  };
  const router = useRouter();
  useEffect(() => {
    if (tokenData?.ok) {
      router.push('/');
    }
  }, [tokenData, router]);

  return (
    <div className='mx-auto mt-20 max-w-xl px-4 text-stone-800'>
      <Head>
        <title>마켓</title>
      </Head>
      <h3 className='text-center text-3xl font-bold'>Market</h3>
      <div className='space-y-7 pt-14'>
        {data?.ok ? (
          <>
            <span className='inline-flex items-center bg-green-300 px-2 text-xs font-medium tracking-wide'>
              TEST &nbsp; | &nbsp;11718
            </span>
            <form
              onSubmit={tokenSubmit(onTokenValid)}
              className='flex flex-col'
            >
              <Input
                register={tokenRegister('token')}
                name='token'
                label='인증번호'
                type='number'
                required
              />
              <RoundedBtn text={tokenLoading ? 'Loading...' : '확인'} />
            </form>
          </>
        ) : (
          <>
            <div className='flex'>
              <span className='text-xs'>로그인</span>
              <span className='mx-2 inline-flex items-center bg-green-300 px-2 text-xs font-medium tracking-wide'>
                TEST &nbsp; | &nbsp;1111@gmail.com
              </span>
            </div>
            <form onSubmit={handleSubmit(onValid)} className='flex flex-col'>
              <Input
                register={register('email', { required: true })}
                name='email'
                label='E-mail'
                type='email'
                required
              />
              <RoundedBtn text={submitting ? 'Loading...' : '로그인'} />
            </form>
          </>
        )}
      </div>
    </div>
  );
};
export default Login;
