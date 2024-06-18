import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher } from '../utils/axios';

export function useGetSeminar(page = 1, limit = 10) {
  const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/company/664ec7b3671bf9a7f5366599/664ec7b3671bf9a7f536659b/seminar?page=${page}&limit=${limit}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const seminars = data?.data?.seminars || [];
  const memoizedValue = useMemo(
    () => ({
      Seminar: seminars,
      SeminarLoading: isLoading,
      SeminarError: error,
      SeminarValidating: isValidating,
      SeminarEmpty: !isLoading && seminars.length === 0,
    }),
    [seminars, error, isLoading, isValidating]
  );

  return memoizedValue;
}
