import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher } from '../utils/axios';

export function useGetStudents(page, limit) {
  const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/company//664ec61d671bf9a7f53664b5/student`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      students: data?.data?.students || [],
      studentsLoading: isLoading,
      studentsError: error,
      studentsValidating: isValidating,
      studentsEmpty: !isLoading && !data?.data?.students.length,
    }),
    [data?.data?.students, error, isLoading, isValidating],
  );

  return memoizedValue;
}

