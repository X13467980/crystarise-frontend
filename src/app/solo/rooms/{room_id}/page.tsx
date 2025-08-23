'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import TopBoard from '@/feature/TopBoard/TopBoard';
import MovingCircle from '@/feature/MovingCircle/MovingCircle';
import SoloRecord from '@/feature/SoloRecord/SoloRecord';
import { useAuth } from '@/feature/hooks/useAuth';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

type RoomDetail = {
  id: number;
  name: string;
  // crystals が 1:1 ならこんな感じで想定
  crystal?: {
    title: string;
    target_value: number;
    unit: string;
  };
};

export default function SoloRoomPage() {
  const { room_id } = useParams<{ room_id: string }>();
  const { token, validateToken, isAuthenticated, logout } = useAuth();

  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState<RoomDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 表示用の安全な値（API が未整備でも動くようフォールバック）
  const roomName   = room?.name ?? 'Room';
  const goalName   = room?.crystal?.title ?? 'Goal';
  const goalNumber = room?.crystal?.target_value ?? 0;
  const goalUnit   = room?.crystal?.unit ?? '';

  // 進捗パーセンテージは仮（API があれば差し替え）
  const percentage = useMemo(() => {
    // TODO: 実データで計算する
    return goalNumber > 0 ? 70 : 0;
  }, [goalNumber]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        if (!room_id) throw new Error('room_id not found');

        // 認証（必要なAPIなら）
        if (!isAuthenticated || !(await validateToken()) || !token) {
          setError('ログインが必要です');
          logout();
          return;
        }

        // 例: GET /rooms/{id} で rooms と crystals を返す想定
        const res = await fetch(`${API_BASE}/rooms/${room_id}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        });

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          const msg = body?.detail || `HTTP ${res.status}`;
          throw new Error(msg);
        }

        const data = (await res.json()) as RoomDetail;
        setRoom(data);
      } catch (e: any) {
        setError(e?.message ?? '取得に失敗しました');
      } finally {
        setLoading(false);
      }
    })();
  }, [room_id, token, isAuthenticated, validateToken, logout]);

  if (loading) {
    return (
      <div className="bg-[#144794] w-full min-h-screen flex items-center justify-center">
        <p className="text-white">読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#144794] w-full min-h-screen flex items-center justify-center">
        <p className="text-red-200">エラー: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#144794] w-full min-h-screen flex justify-center" data-model-id="33:148">
      <div className="bg-[#144794] w-full max-w-[393px] min-h-[852px] relative">
        <SoloRecord goalNumber={goalNumber} goalUnit={goalUnit} />
        <MovingCircle percentage={percentage} />
        <TopBoard
          className="!absolute !left-1/2 !transform !-translate-x-1/2 !top-4"
          roomName={roomName}
          goalName={goalName}
          goalNumber={goalNumber}
          goalUnit={goalUnit}
        />
      </div>
    </div>
  );
}