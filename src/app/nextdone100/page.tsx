// src/app/nextdone100/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/feature/Header/Header';
import Image from 'next/image';
import Link from 'next/link';
import TopBoard from '@/feature/TopBoard/TopBoard';
import { useAuth } from '@/feature/hooks/useAuth';

type Room = {
  name: string;
  crystal?: {
    title?: string;
    target_value?: number;
    unit?: string;
  };
};

export default function NextDone100() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId') ?? 'demo'; // fallback
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

  const { token } = useAuth();

  const [room, setRoom] = useState<Room | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // token が無い間は API を叩かない（未ログイン時の403回避）
    if (!token) {
      setLoading(false);
      setError('ログインが必要です');
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/rooms/${roomId}`, {
          cache: 'no-store',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const msg = await res.text().catch(() => '');
          throw new Error(`Failed to fetch room: ${res.status} ${msg}`);
        }

        const data = (await res.json()) as Room;
        if (!cancelled) setRoom(data ?? null);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : '取得に失敗しました');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [API_BASE, roomId, token]);

  const roomName = room?.name ?? 'Room';
  const goalName = room?.crystal?.title ?? 'Goal';
  const goalNumber = room?.crystal?.target_value ?? 0;
  const goalUnit = room?.crystal?.unit ?? '';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 grid place-items-center px-4">
        <div className="w-72 flex flex-col items-center gap-5">
          <p className="font-mkpop text-4xl">100% 達成！</p>

          <Image src="/fullsnowflake.svg" width={287} height={289} alt="snowflake" />
          <Image src="/information.svg" width={164} height={24} alt="information" />

          {loading ? (
            <p className="text-sm opacity-70">読み込み中…</p>
          ) : error ? (
            <p className="text-sm text-red-300 text-center break-words">{error}</p>
          ) : null}

          <Link href="/getbadge100" className="primary-btn mt-4 text-center">
            次へ
          </Link>

          <TopBoard
            roomName={roomName}
            goalName={goalName}
            goalNumber={goalNumber}
            goalUnit={goalUnit}
          />
        </div>
      </main>
    </div>
  );
}