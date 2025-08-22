'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/client'; // ← ここはあなたの supabase 初期化ファイルのパスに合わせてね

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

type Props = {
  title: string;        // crystals.title
  targetValue: number;  // crystals.target_value
  unit: string;         // crystals.unit
};

export default function NewRoomButton({ title, targetValue, unit }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      // Supabaseセッションからアクセストークン取得
      const { data: sessionData, error: sessionErr } = await supabase.auth.getSession();
      if (sessionErr || !sessionData.session?.access_token) {
        alert('ログインが必要です');
        return;
      }
      const token = sessionData.session.access_token;

      // バックエンドへリクエスト
      const res = await fetch(`${API_BASE}/rooms/solo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          target_value: targetValue,
          unit,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.detail || `HTTP ${res.status}`);
      }

      const data = await res.json();
      // 成功したらルームページへ
      router.push(`/rooms/${data.room_id}`);
    } catch (e: any) {
      console.error(e);
      alert(`作成に失敗しました: ${e.message ?? e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="primary-btn w-full"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? '作成中...' : '作成する'}
      </button>
    </div>
  );
}