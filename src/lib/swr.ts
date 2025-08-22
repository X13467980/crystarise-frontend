import useSWR, { SWRConfiguration } from 'swr';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

const fetcher = async (path: string) => {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${API_BASE}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    credentials: 'include',
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body?.detail || `HTTP ${res.status}`);
    // エラーにstatusを付与して呼び出し側で分岐できるように
    // @ts-expect-error
    err.status = res.status;
    throw err;
  }
  return res.json();
};

export const swrOptions: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60_000, // 1分間は同一キーの重複をまとめる
  keepPreviousData: true,
};

export function useApi<T = any>(key: string | null) {
  return useSWR<T>(key, fetcher, swrOptions);
}