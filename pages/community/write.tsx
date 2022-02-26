import { NextPage } from 'next';
import Layout from '../../components/layout';
import RoundedBtn from '../../components/roundedBtn';
import { TextArea } from '../../components/textArea';

const Write: NextPage = () => {
  return (
    <Layout back>
      <div className='p-4'>
        <TextArea placeholder='이것이 궁금해요!' />
        <RoundedBtn text='글 남기기' />
      </div>
    </Layout>
  );
};

export default Write;
