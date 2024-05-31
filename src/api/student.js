import { useMemo } from 'react';
import useSWR from 'swr';
import { fetcher } from 'src/utils/axios';

export function useGetAllStudents() {
  const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/company/664ec7b3671bf9a7f5366599/student`;
  const { data} = useSWR(URL, fetcher);


  const memoizedValue = useMemo(
    () => ({
      students: data?.data?.students || [],
      
    }),
    [data]
  );

  return memoizedValue;
}
