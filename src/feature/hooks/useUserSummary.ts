//useSummary.ts
'use client';

import { useApi } from '@/lib/swr';
import { useAuth } from './useAuth';

type UserSummary = {
  display_name: string;
  avatar_url?: string;
  solo_count: number;
  team_count: number;
  badge_count: number;
};

export function useUserSummary() {
  const { isAuthenticated, logout } = useAuth();

  // 認証前はキーnullでリクエスト自体を発火しない
  const { data, error, isLoading, mutate } = useApi<UserSummary>(
    isAuthenticated ? '/me/profile' : null
  );

  // 認証エラー（401/404）はログアウトへ
  if (error?.status === 401 || error?.status === 404) {
    logout(); // ログイン画面へ遷移
  }

  return {
    data: data
      ? {
          displayName: data.display_name,
          avatarUrl: data.avatar_url,
          soloCount: data.solo_count,
          teamCount: data.team_count,
          badgeCount: data.badge_count,
        }
      : null,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refresh: mutate,
  };
}