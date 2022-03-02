import { LikeWith } from 'pages';
import useSWR from 'swr';
import Items from './items';

interface ListProps {
  kind: 'favorite' | 'sales' | 'purchases';
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
  return data ? (
    <>
      {data[kind]?.map(record => (
        <Items
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          id={record.product.id}
          like={record.product._count.favorite}
        />
      ))}
    </>
  ) : null;
}
