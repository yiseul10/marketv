import { Router, useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

export default function useUser() {
  const router = useRouter();
  const { data, error } = useSWR('/api/users/me');
  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/entrace');
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
  /* const [user, setUser] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetch('/api/users/me')
      .then(response => response.json())
      .then(data => {
        if (!data.ok) {
          return router.replace('/entrace');
        }
        setUser(data.profile);
      });
  }, [router]); 
  return user; */
}
