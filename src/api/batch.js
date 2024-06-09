import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher } from '../utils/axios';

export function useGetBatches(user) {
  const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/company/${user}/batch`;
  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      batch: data?.data || [],
      batchLoading: isLoading,
      batchError: error,
      batchValidating: isValidating,
      batchEmpty: !isLoading && !data?.data?.length,
      mutate,
    }),
    [data?.data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
