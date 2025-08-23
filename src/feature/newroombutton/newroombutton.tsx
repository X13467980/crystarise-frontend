'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/feature/hooks/useAuth'; // ← パスは実際の配置に合わせて
                                                     // 例: '@/hooks/useAuth' など

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

type Props = {
  name: string;        // rooms.name
  title: string;        // crystals.title
  targetValue: number;  // crystals.target_value
  unit: string;         // crystals.unit
};

export default function NewRoomButton({ name, title, targetValue, unit }: Props) {
  const router = useRouter();
  const { token, isAuthenticated, validateToken, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    // フロント側の軽いバリデーション
    if (!name.trim()) return alert('ルーム名を入力してください');
    if (!title.trim()) return alert('目標タイトルを入力してください');
    if (!Number.isFinite(targetValue) || targetValue <= 0)
      return alert('目標の数値は正の数で入力してください');
    if (!unit.trim()) return alert('単位を入力してください');

    try {
      setLoading(true);

      // ローカル保存トークンの有効性チェック
      if (!isAuthenticated || !(await validateToken()) || !token) {
        alert('ログインが必要です');
        logout(); // 任意：ログイン画面へ
        return;
      }

      // バックエンドへリクエスト（Authorization: Bearer <token>）
      const res = await fetch(`${API_BASE}/rooms/solo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          title,
          target_value: targetValue,
          unit,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.detail || `HTTP ${res.status}`);
      }

      const data: { room_id: number } = await res.json();
      router.push(`/rooms/${data.room_id}`);
    } catch (e: any) {
      console.error('[NewRoomButton] create failed:', e);
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