import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher } from '../utils/axios';

export function useGetExpense(user) {
  const URL = `${import.meta.env.VITE_AUTH_API}/api/company/${user?.company_id}/expense`;
  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      expense: data?.data || [],
      expenseLoading: isLoading,
      expenseError: error,
      expenseValidating: isValidating,
      expenseEmpty: !isLoading && !data?.data?.length,
      mutate,
    }),
    [data?.data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
