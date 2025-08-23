import useSWR, { SWRConfiguration, SWRResponse } from 'swr';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

type HttpError = Error & { status?: number };

async function fetcher<T>(path: string): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  const res = await fetch(`${API_BASE}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    credentials: 'include', // cookie を使う場合
  });

  if (!res.ok) {
    // 失敗時も body を読みにいく（JSON でない可能性も考慮）
    const body = (await res.json().catch(() => ({}))) as { detail?: string };
    const err: HttpError = new Error(body?.detail || `HTTP ${res.status}`);
    err.status = res.status; // 呼び出し側で分岐しやすいように付与
    throw err;
  }

  // 成功時は型 T として返す
  return (await res.json()) as T;
}

export const swrOptions: SWRConfiguration = {
  fetcher, // SWR 側の fetcher 引数には path が入る
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60_000, // 1分は同一キーをまとめる
  keepPreviousData: true,
};

// 型安全な API フック
export function useApi<T = unknown>(key: string | null): SWRResponse<T, HttpError> {
  // fetcher に型パラメータを渡すため、ラッパーを噛ませる
  const typedFetcher = (k: string) => fetcher<T>(k);
  return useSWR<T, HttpError>(key, typedFetcher, swrOptions);
}