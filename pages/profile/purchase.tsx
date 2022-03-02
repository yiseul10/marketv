import ProductList from '@components/productList';
import { NextPage } from 'next';
import Layout from '@components/layout';

const MyPurchase: NextPage = () => {
  return (
    <Layout text='구매내역' back>
      <div className='flex flex-col space-y-5'>
        <ProductList kind='purchases' />
      </div>
    </Layout>
  );
};

export default MyPurchase;
