import { useCallback } from 'react';

interface UseApiReturn {
  request: <T>(
    url: string,
    options?: RequestInit
  ) => Promise<T>;
}

export function useApi(): UseApiReturn {
  const request = useCallback(async <T,>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> => {
    const token = localStorage.getItem('adminToken');
    const headers = new Headers(options.headers || {});

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || `API error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }, []);

  return { request };
}
