import { NextPage } from 'next';
import { Avatar } from '@components/avatar';
import Input from '@components/input';
import Layout from '@components/layout';
import RoundedBtn from '@components/roundedBtn';

const Edit: NextPage = () => {
  return (
    <Layout back>
      <div className='space-y-5 p-5'>
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
        <Input label='E-mail' name='mail' type='email' kind='text' required />
        <Input
          label='전화번호'
          name='phone'
          type='number'
          kind='phone'
          required
        />
        <RoundedBtn text='수정' />
      </div>
    </Layout>
  );
};

export default Edit;
