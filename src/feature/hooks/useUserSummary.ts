'use client';

import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

export type UserSummary = {
  displayName: string;
  avatarUrl?: string | null;
  soloCount: number;
  teamCount: number;
  badgeCount: number;
};

type ApiProfile = {
  display_name: string;
  avatar_url?: string | null;
  solo_count: number;
  team_count: number;
  badge_count: number;
  // 余分な項目が来ても無視
  [k: string]: unknown;
};

export function useUserSummary() {
  const [data, setData] = useState<UserSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let aborted = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const token = typeof window !== 'undefined'
          ? localStorage.getItem('access_token')
          : null;

        if (!token) {
          // 未ログイン扱い（dataはnullのまま）
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE}/me/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        if (!res.ok) {
          // 401/404などは未ログイン or プロファイル未作成として扱う
          if (!aborted) {
            setError(
              typeof json?.detail === 'string'
                ? json.detail
                : 'プロフィールの取得に失敗しました'
            );
            // 401は未ログイン扱いにしたいなら、ここで setError(null) してもOK
          }
          return;
        }

        const p = json as ApiProfile;

        const mapped: UserSummary = {
          displayName: p.display_name,
          avatarUrl: p.avatar_url ?? null,
          soloCount: p.solo_count ?? 0,
          teamCount: p.team_count ?? 0,
          badgeCount: p.badge_count ?? 0,
        };

        if (!aborted) setData(mapped);
      } catch (e: any) {
        if (!aborted) setError(e?.message ?? '予期せぬエラーが発生しました');
      } finally {
        if (!aborted) setLoading(false);
      }
    })();

    return () => {
      aborted = true;
    };
  }, []);

  return { data, loading, error };
}