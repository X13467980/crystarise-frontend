'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

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
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setData(null); return; }

        const { data: profile, error: pErr } = await supabase
          .from('profiles')
          .select('display_name, avatar_url')
          .eq('id', user.id)
          .maybeSingle();
        if (pErr) throw pErr;

        const [solo, team, total] = await Promise.all([
          supabase.from('crystals').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('mode', 'solo'),
          supabase.from('crystals').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('mode', 'team'),
          supabase.from('crystals').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        ]);

        if (!mounted) return;
        setData({
          displayName: profile?.display_name ?? user.user_metadata?.name ?? 'ゲスト',
          avatarUrl: profile?.avatar_url ?? user.user_metadata?.avatar_url ?? null,
          soloCount: solo.count ?? 0,
          teamCount: team.count ?? 0,
          badgeCount: total.count ?? 0,
        });
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message ?? 'failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return { data, loading, error };
}