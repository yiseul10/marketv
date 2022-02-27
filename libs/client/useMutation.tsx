import { useState } from 'react';

interface MutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}
type MutationResult<T> = [(data: any) => void, MutationState<T>];

export default function useMutation<T = any>(url: string): MutationResult<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);

  function mutation(data: any) {
    setLoading(true);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      // 데이터가 없는 경우 error처리하지 않게
      .then(response => response.json().catch(() => {}))
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }
  return [mutation, { loading, data, error }];
}
