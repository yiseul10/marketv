import useMutation from '@libs/client/useMutation';
import { Post } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../../components/layout';
import RoundedBtn from '../../components/roundedBtn';
import { TextArea } from '../../components/textArea';

interface Write {
  question: string;
}
interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Write>();
  const [post, { loading, data }] = useMutation<WriteResponse>('/api/posts');
  const onValid = (data: Write) => {
    if (loading) return;
    post(data);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);

  return (
    <Layout back text='Q & A'>
      <form onSubmit={handleSubmit(onValid)}>
        <div className='p-4'>
          <TextArea
            register={register('question', { required: true, minLength: 5 })}
            placeholder='이것이 궁금해요!'
            required
          />
          <RoundedBtn text={loading ? 'Loading...' : '글 남기기'} />
        </div>
      </form>
    </Layout>
  );
};

export default Write;
