import useSWR from 'swr';
import { useMemo } from 'react';
import { fetcher } from 'src/utils/axios';
export function useGetAllDemos() {
  const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/company/664ec61d671bf9a7f53664b5/demo?limit=10&page=1`;
  const { data } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      demo: data?.data?.data || [],
    }),
    [data?.data]
  );
  return memoizedValue;
}
