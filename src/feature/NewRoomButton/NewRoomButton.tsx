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
  /** 作成成功後の遷移先。例: "/lobby/:room_id"（:room_id は実IDに置換） */
  redirectTo?: string;
  className?: string;
};

type CreateRoomResponse = {
  room_id?: number;
  id?: number;
  detail?: string;
  password?: string;
  room?: { id?: number; password?: string };
};

export default function NewRoomButton({
  roomType,
  name,
  title,
  targetValue,
  unit,
  redirectTo,
}: Props) {
  const router = useRouter();
  const { token, isAuthenticated, validateToken, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!name.trim()) return alert('ルーム名を入力してください');
    if (!title.trim()) return alert('目標タイトルを入力してください');
    if (!Number.isFinite(targetValue) || targetValue <= 0)
      return alert('目標の数値は正の数で入力してください');
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
      try {
        data = (await res.json()) as CreateRoomResponse;
      } catch {}

      if (!res.ok) {
        const msg = data?.detail ?? `HTTP ${res.status}`;
        throw new Error(msg);
      }

      const roomId = data?.room_id ?? data?.id ?? data?.room?.id;
      if (!roomId) throw new Error('Invalid response: room_id not found');

      // ★ draft を保存して TopBoard を即時反映（roomType でキー分岐）
      try {
        sessionStorage.setItem(
          `${roomType}:room:${roomId}`,
          JSON.stringify({
            roomName: name.trim(),
            goalName: title.trim(),
            goalNumber: Number(targetValue),
            goalUnit: unit.trim(),
            roomPassword: data?.password ?? data?.room?.password ?? null,
          })
        );
      } catch {}

      // ★ ここで redirectTo が指定されていれば最優先で遷移
      if (redirectTo) {
        const path =
          redirectTo.includes(':room_id')
            ? redirectTo.replace(':room_id', String(roomId))
            : `${redirectTo}?room_id=${roomId}`;
        router.push(path);
      } else {
        router.push(getRoomPath(roomType, roomId));
      }
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
      <button
        type="button"
        className="primary-btn w-full"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? '作成中...' : roomType === 'solo' ? '一人で作成する' : 'みんなで作成する'}
      </button>
    </div>
  );
}