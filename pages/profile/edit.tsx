import { NextPage } from 'next';
import { Avatar } from '@components/avatar';
import Input from '@components/input';
import Layout from '@components/layout';
import RoundedBtn from '@components/roundedBtn';
import useUser from '@libs/client/useUser';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import useMutation from '@libs/client/useMutation';

interface EditProfile {
  email?: string;
  phone?: string;
  name?: string;
  requiredError?: string;
}
interface EditResponse {
  ok: boolean;
  error?: string;
}
const Edit: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<EditProfile>();
  const [edit, { data, loading }] = useMutation<EditResponse>('/api/users/me');
  useEffect(() => {
    if (user?.email) setValue('email', user?.email);
    if (user?.phone) setValue('phone', user?.phone);
    if (user?.name) setValue('name', user?.name);
  }, [user, setValue]);

  const onValid = ({ email, phone, name }: EditProfile) => {
    if (loading) return;
    if (email === '' || name === '') {
      return setError('requiredError', {
        message: '이메일과 이름은 필수항목입니다.'
      });
    }
    edit({ email, phone, name });
  };
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError('requiredError', { message: data.error });
    }
  }, [data, setError]);

  return (
    <Layout back>
      <form className='space-y-5 p-5' onSubmit={handleSubmit(onValid)}>
        <div className='flex items-center space-x-4'>
          <Avatar lg />
          <label
            htmlFor='picture'
            className='cursor-pointer rounded-full border border-stone-500 py-1.5 px-4 text-sm'
          >
            사진변경
            <input
              id='picture'
              type='file'
              className='hidden'
              accept='image/*'
            />
          </label>
        </div>
        <Input
          register={register('name')}
          label='이름'
          name='name'
          type='text'
        />
        <Input
          register={register('email')}
          label='E-mail'
          name='mail'
          type='email'
        />
        {errors.requiredError ? (
          <span className='text-xs text-rose-500'>
            {errors.requiredError.message}
          </span>
        ) : null}
        <Input
          register={register('phone', { minLength: 8 })}
          label='연락처'
          name='phone'
          type='phone'
          kind='phone'
          minLength={8}
        />

        <RoundedBtn text={loading ? 'Loading...' : '정보수정'} />
      </form>
    </Layout>
  );
};

export default Edit;
