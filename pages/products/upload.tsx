import { NextPage } from 'next';
import Input from '@components/input';
import Layout from '@components/layout';
import RoundedBtn from '@components/roundedBtn';
import { TextArea } from '@components/textArea';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Product } from '@prisma/client';

interface Upload {
  name: string;
  price: number;
  desc: string;
  pic: FileList;
}
interface UploadProduct {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<Upload>();
  const [product, { loading, data }] =
    useMutation<UploadProduct>('/api/products');
  const [picUpload, setPicUpload] = useState('');
  const pic = watch('pic');
  useEffect(() => {
    if (pic && pic.length > 0) {
      const file = pic[0];
      setPicUpload(URL.createObjectURL(file));
    }
  }, [pic]);

  const onValid = async ({ name, price, desc }: Upload) => {
    if (loading) return;
    if (pic && pic.length > 0) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();
      form.append('file', pic[0], name);

      const {
        result: { id }
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form
        })
      ).json();
      product({ name, price, desc, picId: id });
    } else {
      product({ name, price, desc });
    }
  };
  useEffect(() => {
    if (data?.ok) {
      router.push(`/products/${data.product.id}`);
    }
  }, [data, router]);

  return (
    <Layout back>
      <form onSubmit={handleSubmit(onValid)} className='space-y-5'>
        <div className='px-4 space-y-4'>
          {picUpload ? (
            <img
              src={picUpload}
              className='w-full rounded-md h-48 object-contain'
            />
          ) : (
            <label className='flex h-48 w-full cursor-pointer items-center justify-center rounded-lg text-stone-700 hover:bg-stone-100'>
              <svg
                className='h-16 w-16'
                stroke='currentColor'
                fill='none'
                viewBox='0 0 48 48'
                aria-hidden='true'
              >
                <path
                  d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <input
                {...register('pic')}
                accept='image/*'
                className='hidden'
                type='file'
              />
            </label>
          )}
          <Input
            register={register('name', { required: true })}
            label='상품명'
            name='title'
            type='text'
            required
          />
          <Input
            register={register('price', { required: true })}
            label='판매가격'
            kind='price'
            name='price'
            type='text'
            required
          />
          <TextArea
            register={register('desc', { required: true })}
            label='상품설명'
            name='desc'
            required
          />
          <RoundedBtn text={loading ? 'upload...' : '파일올리기'} />
        </div>
      </form>
    </Layout>
  );
};

export default Upload;
