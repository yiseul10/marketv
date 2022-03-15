import { NextPage } from 'next';
import Input from '@components/input';
import Layout from '@components/layout';
import RoundedBtn from '@components/roundedBtn';
import useUser from '@libs/client/useUser';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useMutation from '@libs/client/useMutation';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface EditProfile {
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
  requiredError?: string;
}
interface EditResponse {
  ok: boolean;
  error?: string;
}
const Edit: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    watch,
    formState: { errors }
  } = useForm<EditProfile>();
  const [edit, { data, loading }] = useMutation<EditResponse>('/api/users/me');
  useEffect(() => {
    if (user?.email) setValue('email', user?.email);
    if (user?.phone) setValue('phone', user?.phone);
    if (user?.name) setValue('name', user?.name);
    if (user?.avatar)
      setAvatarChange(
        `https://imagedelivery.net/dUPbaZcFtQ32zB4tsu9zTQ/${user.avatar}/avatar`
      );
  }, [user, setValue]);

  const onValid = async ({ email, phone, name, avatar }: EditProfile) => {
    if (loading) return;
    if (email === '' || name === '') {
      return setError('requiredError', {
        message: '이메일과 이름은 필수항목입니다.'
      });
    }
    if (avatar && avatar?.length > 0 && user?.email) {
      // ask for CF URL
      const cloudRequest = await fetch(`/api/files`);
      // 받아온 데이터를 구조분해
      const { uploadURL } = await cloudRequest.json();
      // form 생성
      const form = new FormData();
      form.append('file', avatar[0], user?.email);
      // cf에서 전달받은 url
      const {
        result: { id }
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form
        })
      ).json();

      edit({
        email,
        phone,
        name,
        avatarId: id
      });
      router.push('/profile');
    } else {
      edit({
        email,
        phone,
        name
      });
      router.push('/profile');
    }
  };
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError('requiredError', { message: data.error });
    }
  }, [data, setError]);
  const [avatarChange, setAvatarChange] = useState('');
  const avatar = watch('avatar');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      // avatar는 FileList 배열의 원소로 담겨있다.
      const file = avatar[0];
      // 브라우저 메모리의 주소를 가져온다.
      setAvatarChange(URL.createObjectURL(file));
    }
  }, [avatar]);

  return (
    <Layout back>
      <form className='space-y-5 p-5' onSubmit={handleSubmit(onValid)}>
        <div className='flex items-center space-x-4 relative'>
          {avatarChange ? (
            <Image
              className='rounded-full bg-stone-300'
              src={avatarChange}
              alt='avatar'
              width={48}
              height={48}
            />
          ) : (
            <div className='h-16 w-16 rounded-full bg-stone-300' />
          )}

          <label
            htmlFor='picture'
            className='cursor-pointer rounded-full border border-stone-500 py-1.5 px-4 text-sm'
          >
            사진변경
            <input
              {...register('avatar')}
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
