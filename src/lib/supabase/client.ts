// src/lib/supabase/client.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let browserClient: SupabaseClient | null = null;

/** ブラウザ専用：必要時にだけ生成（env 未設定なら呼び出し側で握れるように throw） */
export function getSupabaseBrowserClient(): SupabaseClient {
  // SSR/ビルド時に実行されないように
  if (typeof window === 'undefined') {
    throw new Error('Supabase browser client must be used in the browser.');
  }

  if (browserClient) return browserClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error('Supabase env missing: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  browserClient = createClient(url, anon, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });
  return browserClient;
}