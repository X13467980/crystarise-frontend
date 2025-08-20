'use client';

import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

export function useUserSummary() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { token, logout } = useAuth();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/me/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();

        if (!res.ok) {
          // トークンが無効なら削除してログアウト
          if (res.status === 401 || res.status === 404) {
            logout();
            return;
          }
          throw new Error(json?.detail ?? 'プロフィール取得に失敗しました');
        }

        setData({
          displayName: json.display_name,
          avatarUrl: json.avatar_url,
          soloCount: json.solo_count,
          teamCount: json.team_count,
          badgeCount: json.badge_count,
        });
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, logout]);

  return { data, loading, error };
}