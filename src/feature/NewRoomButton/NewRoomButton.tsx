// src/feature/NewRoomButton/NewRoomButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/feature/hooks/useAuth';
import { getRoomPath } from '@/lib/routes';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

type RoomType = 'solo' | 'group';

type Props = {
  roomType: RoomType;
  name: string;
  title: string;
  targetValue: number;
  unit: string;
};

type CreateRoomResponse = { room_id?: number; id?: number; detail?: string };

export default function NewRoomButton({ roomType, name, title, targetValue, unit }: Props) {
  const router = useRouter();
  const { token, isAuthenticated, validateToken, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!name.trim()) return alert('ルーム名を入力してください');
    if (!title.trim()) return alert('目標タイトルを入力してください');
    if (!Number.isFinite(targetValue) || targetValue <= 0) return alert('目標の数値は正の数で入力してください');
    if (!unit.trim()) return alert('単位を入力してください');

    try {
      setLoading(true);

      if (!isAuthenticated || !(await validateToken()) || !token) {
        alert('ログインが必要です');
        logout();
        return;
      }

      const endpoint = roomType === 'solo' ? '/rooms/solo' : '/rooms/group';

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, title, target_value: targetValue, unit }),
      });

      let data: CreateRoomResponse | null = null;
      try { data = (await res.json()) as CreateRoomResponse; } catch {}

      if (!res.ok) {
        const msg = data?.detail ?? `HTTP ${res.status}`;
        throw new Error(msg);
      }

      const roomId = data?.room_id ?? data?.id;
      if (!roomId) throw new Error('Invalid response: room_id not found');

      // ★★★ ここが重要：遷移前に draft を保存（TopBoard 即時表示のため）
      try {
        sessionStorage.setItem(
          `solo:room:${roomId}`,
          JSON.stringify({
            roomName: name.trim(),
            goalName: title.trim(),
            goalNumber: Number(targetValue),
            goalUnit: unit.trim(),
          })
        );
      } catch {}

      router.push(getRoomPath(roomType, roomId));
    } catch (e: unknown) {
      console.error('[NewRoomButton] create failed:', e);
      const message = e instanceof Error ? e.message : String(e);
      alert(`作成に失敗しました: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button type="button" className="primary-btn w-full" onClick={handleClick} disabled={loading}>
        {loading ? '作成中...' : roomType === 'solo' ? '一人で作成する' : 'みんなで作成する'}
      </button>
    </div>
  );
}