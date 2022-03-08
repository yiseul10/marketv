import ProductList from '@components/productList';
import { NextPage } from 'next';
import Layout from '@components/layout';

const MyFavorite: NextPage = () => {
  return (
    <Layout text='관심목록' back>
      <div className='flex flex-col space-y-5 '>
        <ProductList kind='favorites' />
      </div>
    </Layout>
  );
};

export default MyFavorite;
