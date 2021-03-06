import { NextPage } from 'next';
import Layout from '@components/layout';
import ProductList from '@components/productList';

const MySell: NextPage = () => {
  return (
    <Layout text='판매내역' back>
      <div className='flex flex-col space-y-5'>
        <ProductList kind='sales' />
      </div>
    </Layout>
  );
};

export default MySell;
