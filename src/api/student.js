import useSWR from 'swr';
import { useMemo } from 'react';

import { useAuthContext } from 'src/auth/hooks';
import { fetcher } from '../utils/axios';

export function useGetStudents() {
  const { user } = useAuthContext();
  const URL = `${import.meta.env.VITE_AUTH_API}/api/v2/${user.company_id}/student`;
  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);


  const memoizedValue = useMemo(
    () => ({
      students: data?.students || [],
      studentsLoading: isLoading,
      studentsError: error,
      studentsValidating: isValidating,
      studentsEmpty: !isLoading && !data?.data?.students.length,
      mutate,
    }),
    [data, isLoading, error, isValidating, mutate]
  );

  return memoizedValue;
}
export function useGetStudentsList(id) {
  const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/v2/${id}/student-list`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      students: data?.students || [],
      studentsLoading: isLoading,
      studentsError: error,
      studentsValidating: isValidating,
      studentsEmpty: !isLoading && !data?.students.length,
    }),
    [data?.students, error, isLoading, isValidating]
  );

  return memoizedValue;
}
