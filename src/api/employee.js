import useSWR from 'swr';
import { useMemo } from 'react';

import {  fetcher } from '../utils/axios';

export function useGetEmployees(page, limit) {
  const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/company/664ec61d671bf9a7f53664b5/employee`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      employees: data?.data?.employees || [],
      employeesLoading: isLoading,
      employeesError: error,
      employeesValidating: isValidating,
      employeesEmpty: !isLoading && !data?.data?.employees.length,
    }),
    [data?.data?.employees, error, isLoading, isValidating]
  );

  return memoizedValue;
}
