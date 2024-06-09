import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher } from '../utils/axios';

export function useGetAllDemos(page, limit) {
  const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/company/664ec7b3671bf9a7f5366599/demo?limit=10&page=1`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const demo =  data?.data || [];
  const memoizedValue = useMemo(
    () => ({
      demo: demo,
      demoLoading: isLoading,
      demoError: error,
      demoValidating: isValidating,
      demoEmpty: !isLoading && !demo.length,
    }),
    [demo, error, isLoading, isValidating]
    );

  return memoizedValue;
}
