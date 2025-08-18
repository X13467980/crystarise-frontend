// app/debug/page.tsx
'use client';
import { supabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [msg, setMsg] = useState('checking...');

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('this_table_does_not_exist').select('*').limit(1);
      if (error) {
        // ここに来れば接続は OK（テーブルがないので当然エラー）
        setMsg(`✅ connected (got expected error): ${error.code} ${error.message}`);
      } else {
        setMsg(`⚠️ unexpected: ${JSON.stringify(data)}`);
      }
    })();
  }, []);

  return <pre className="p-4">{msg}</pre>;
}