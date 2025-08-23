// app/debug/page.tsx
'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState, useMemo } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export default function DebugPage() {
  const [msg, setMsg] = useState('checking...');

  const supabase = useMemo(() => {
    try {
      return getSupabaseBrowserClient();
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!supabase) {
      setMsg(
        '❌ Supabase 環境変数が未設定です。NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY を設定してください。'
      );
      return;
    }

    (async () => {
      const { data, error } = await supabase
        .from('this_table_does_not_exist')
        .select('*')
        .limit(1);

      if (error) {
        // ここに来れば接続は OK（テーブルが無いので意図通りエラー）
        setMsg(`✅ connected (expected error): ${error.code} ${error.message}`);
      } else {
        setMsg(`⚠️ unexpected: ${JSON.stringify(data)}`);
      }
    })();
  }, [supabase]);

  return <pre className="p-4 whitespace-pre-wrap break-words">{msg}</pre>;
}