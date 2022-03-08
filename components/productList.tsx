import { LikeWith } from 'pages';
import useSWR from 'swr';
import Items from './items';

interface ListProps {
  kind: 'favorites' | 'sales' | 'purchases';
}

interface ProductList {
  id: number;
  product: LikeWith;
}

// 같은 내용의 페이지 key를 통과시키고
// 배열로 담는다.
interface List {
  [key: string]: ProductList[];
}

export default function ProductList({ kind }: ListProps) {
  const { data } = useSWR<List>(`/api/users/me/${kind}`);
  console.log(data);
  return data ? (
    <div className=' divide-y-[1px] w-full'>
      {data[kind]?.map(record => (
        <Items
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          id={record.product.id}
          like={record.product._count.favorite}
          image={record.product.image}
        />
      ))}
    </div>
  ) : null;
}
