import { useState, useEffect } from 'react';

export interface FetchOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
}

export const useFetch = <T,>(url: string, options: FetchOptions): { data: T | null, error: string | null, loading: boolean } => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: options.method,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          body: options.method !== 'GET' ? JSON.stringify(options.body) : null,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: T = await response.json();
        setData(data);

      } catch (error) {

        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};
