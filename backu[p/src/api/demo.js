import useSWR from 'swr';
import { useMemo } from 'react';

import { useAuthContext } from 'src/auth/hooks';

import { fetcher } from '../utils/axios';

export function useGetAllDemos() {
  const {user}=useAuthContext();
  const URL = `${import.meta.env.VITE_AUTH_API}/api/company/${user.company_id}/demo`;
  const { data, isLoading, error, isValidating ,mutate} = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      demo:data?.data || [],
      demoLoading: isLoading,
      demoError: error,
      demoValidating: isValidating,
      demoEmpty: !isLoading && !data.data.length,
      mutate,
    }),
    [data.data, error, isLoading, isValidating,mutate]
    );

  return memoizedValue;
}
