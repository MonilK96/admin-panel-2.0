import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetInquiry() {
  const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/company/664ec61d671bf9a7f53664b5/inquiry`;
  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      inquiry: data?.data?.inquiry || [],
      inquiryLoading: isLoading,
      inquiryError: error,
      inquiryValidating: isValidating,
      inquiryEmpty: !isLoading && !data?.data?.inquiry.length,
      mutate, 
    }),
    [data?.data?.inquiry, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}