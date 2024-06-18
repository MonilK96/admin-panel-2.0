import useSWR from 'swr';
import { useMemo } from 'react';

import { useAuthContext } from 'src/auth/hooks';

import { fetcher } from '../utils/axios';


export function useGetEmployees() {
  const { user } = useAuthContext();
  const URL = `${import.meta.env.VITE_AUTH_API}/api/company/${user.company_id}/employee`;
  console.log(URL);
  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      employees: data?.data || [],
      employeesLoading: isLoading,
      employeesError: error,
      employeesValidating: isValidating,
      employeesEmpty: !isLoading && !data.data.length,
      mutate,
    }),
    [data?.data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

