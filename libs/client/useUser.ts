import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

interface UserResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const router = useRouter();
  const { data, error } = useSWR<UserResponse>('/api/users/me');
  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/entrace');
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
