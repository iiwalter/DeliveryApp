import { useState, useCallback, useEffect } from "react";
import { useErrorHandler } from "./useErrorHandler";

type ApiFunction<T> = (params?: any) => Promise<T>;

interface UseApi<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (params?: any) => Promise<void>;
}

export const useApi = <T>(
  apiFunction: ApiFunction<T>,
  params: any = null,
  initialFetch: boolean = true
): UseApi<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { error, handleError } = useErrorHandler();

  const fetchData = useCallback(
    async (fetchParams = params) => {
      setLoading(true);
      try {
        const result = await apiFunction(fetchParams);
        setData(result);
      } catch (err: any) {
        handleError(err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, params, handleError]
  );

  useEffect(() => {
    if (initialFetch) {
      fetchData();
    }
  }, [fetchData, initialFetch]);

  return { data, loading, error, fetchData };
};
