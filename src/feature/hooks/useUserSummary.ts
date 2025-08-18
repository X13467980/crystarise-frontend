'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
// 可能なら: import { Database } from '@/lib/supabase/types'; // 自動生成型

type Summary = {
  displayName: string;
  avatarUrl: string | null;
  soloCount: number;
  teamCount: number;
  badgeCount: number;
};

export function useUserSummary() {
  const [data, setData] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: userRes } = await supabase.auth.getUser();
        const user = userRes?.user ?? null;
        if (!user) {
          if (mounted) {
            setData(null);
          }
          return;
        }

        // profiles は無い可能性もあるので maybeSingle + fallback
        const { data: profile, error: pErr } = await supabase
          .from('profiles')
          .select('display_name, avatar_url')
          .eq('id', user.id)
          .maybeSingle();

        if (pErr && pErr.code !== 'PGRST116') { // not found以外は投げる
          throw pErr;
        }

        const [solo, team, total] = await Promise.all([
          supabase
            .from('crystals')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('mode', 'solo'),
          supabase
            .from('crystals')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('mode', 'team'),
          supabase
            .from('crystals')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id),
        ]);

        if (!mounted) return;

        setData({
          displayName:
            profile?.display_name ??
            (user.user_metadata?.name as string | undefined) ??
            'ゲスト',
          avatarUrl:
            profile?.avatar_url ??
            (user.user_metadata?.avatar_url as string | null) ??
            null,
          soloCount: solo.count ?? 0,
          teamCount: team.count ?? 0,
          badgeCount: total.count ?? 0,
        });
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message ?? 'failed to load');
        setData(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    // 初回ロード
    load();

    // 認証状態の変化に追従
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      load();
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { data, loading, error };
}