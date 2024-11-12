import { useState, useCallback } from "react";

export const useErrorHandler = (timeout = 4000) => {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback(
    (errorMessage: string) => {
      setError(errorMessage);
      const timer = setTimeout(() => {
        setError(null);
      }, timeout);

      return () => clearTimeout(timer);
    },
    [timeout]
  );

  return { error, handleError };
};
