'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/feature/hooks/useAuth';
// If '@/lib/routes' does not exist, create the file as shown below or correct the import path if it is incorrect.
import { getRoomPath } from '../../lib/routes';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

type RoomType = 'solo' | 'group';

type Props = {
  roomType: RoomType;   // 'solo' or 'group'
  name: string;         // rooms.name
  title: string;        // crystals.title
  targetValue: number;  // crystals.target_value
  unit: string;         // crystals.unit
};

type CreateRoomResponse = {
  room_id?: number; // backend A
  id?: number;      // backend B (念のため両対応)
  detail?: string;
};

export default function NewRoomButton({ roomType, name, title, targetValue, unit }: Props) {
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
        logout();
        return;
      }

      // 種別に応じてエンドポイント切替
      const endpoint = roomType === 'solo' ? '/rooms/solo' : '/rooms/group';

      const res = await fetch(`${API_BASE}${endpoint}`, {
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

      // 可能なら先に JSON を取得（失敗しても握りつぶさずメッセージ化）
      let data: CreateRoomResponse | null = null;
      try {
        data = (await res.json()) as CreateRoomResponse;
      } catch {
        // 空や非JSONの場合は null のまま進める
      }

      if (!res.ok) {
        const msg = (data && typeof data.detail === 'string') ? data.detail : `HTTP ${res.status}`;
        throw new Error(msg);
      }

      const roomId = data?.room_id ?? data?.id;
      if (!roomId) throw new Error('Invalid response: room_id not found');

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