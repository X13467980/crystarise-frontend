'use client';

import { useEffect, useMemo, useRef, useState, use as usePromise } from 'react';
import TopBoard from '@/feature/TopBoard/TopBoard';
import MovingCircle from '@/feature/MovingCircle/MovingCircle';
import SoloRecord from '@/feature/SoloRecord/SoloRecord';
import { useAuth } from '@/feature/hooks/useAuth';

export const dynamic = 'force-dynamic';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

type RoomDetail = {
  id: number;
  name: string;
  crystal?: {
    title: string;
    target_value: number;
    unit: string;
  };
};

export default function SoloRoomPage({
  params,
}: {
  params: Promise<{ room_id: string }>;
}) {
  // Next.js 15: params は Promise。React.use()で unwrap
  const { room_id } = usePromise(params);

  const { token, validateToken } = useAuth();

  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState<RoomDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 同じ (room_id, token) の組み合わせでの多重フェッチを防ぐ
  const fetchedKeyRef = useRef<string | null>(null);

  const roomName   = room?.name ?? 'Room';
  const goalName   = room?.crystal?.title ?? 'Goal';
  const goalNumber = room?.crystal?.target_value ?? 0;
  const goalUnit   = room?.crystal?.unit ?? '';

  const percentage = useMemo(() => (goalNumber > 0 ? 70 : 0), [goalNumber]);

  useEffect(() => {
    // token未確定 or room_id未確定の間は何もしない（無駄なloading切り替え防止）
    if (!room_id || !token) return;

    const key = `${room_id}:${token}`;
    if (fetchedKeyRef.current === key) return; // 既に同じ条件でフェッチ済みならスキップ
    fetchedKeyRef.current = key;

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const ok = await validateToken(); // 依存配列には入れない（関数参照の揺れで再実行しない）
        if (!ok) {
          if (!cancelled) {
            setError('ログインが必要です');
            setLoading(false);
          }
          return;
        }

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
        if (!cancelled) {
          setRoom(data);
          setLoading(false);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message ?? '取得に失敗しました');
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // 依存は room_id と token のみに抑える（validateToken は入れない）
  }, [room_id, token]);

  if (!token) {
    // 自動遷移せず、静的に促す（チカチカ防止）
    return (
      <div className="bg-[#144794] w-full min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <p className="mb-4">ログインが必要です</p>
          <a
            href="/login"
            className="inline-block bg-white/10 px-4 py-2 rounded-md hover:bg-white/20 transition"
          >
            ログインページへ
          </a>
        </div>
      </div>
    );
  }

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
        <div className="text-center">
          <p className="text-red-200 mb-4">エラー: {error}</p>
          <a
            href="/login"
            className="inline-block bg-white/10 text-white px-4 py-2 rounded-md hover:bg-white/20 transition"
          >
            ログインページへ
          </a>
        </div>
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