import { NextPage } from 'next';
import Layout from '../../components/layout';

const LiveStream: NextPage = () => {
  return (
    <Layout back>
      <div className='space-y-4 px-4'>
        <div className='aspect-video w-full rounded-md bg-slate-300 shadow-sm' />
        <div className='mt-5'>
          <h1 className='text-3xl font-bold text-gray-900'>title</h1>
          <span className='mt-3 block text-2xl text-gray-900'>5000원</span>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LiveStream;
