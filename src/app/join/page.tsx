// src/app/join/page.tsx
'use client';

import Header from '@/feature/Header/Header';
import { useUserSummary } from '@/feature/hooks/useUserSummary';
import GoLoginButton from '@/feature/GoLogin/GoLoginButton';
import JoinRoomForm from '@/feature/JoinRoomForm/JoinRoomForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

export default function JoinPage() {
  const { data, loading, error } = useUserSummary();
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  async function handleJoin({ roomId, password }: { roomId: string; password: string }) {
    setJoinError(null);

    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (!token) {
      setJoinError('ログイン情報が見つかりません。再ログインしてください。');
      return false;
    }

    const room_id = Number(roomId);
    if (!Number.isFinite(room_id)) {
      setJoinError('ルームIDは数字で入力してください。');
      return false;
    }

    try {
      setJoining(true);
      const res = await fetch(`${API_BASE}/rooms/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ room_id, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg =
          body?.detail ??
          (res.status === 401
            ? 'パスワードが違います。'
            : res.status === 404
            ? 'ルームが見つかりません。'
            : res.status === 409
            ? 'このルームはソロ用で既に埋まっています。'
            : '参加に失敗しました。');
        throw new Error(msg);
      }

      router.push(`/rooms/${room_id}`);
      return true;
    } catch (e: any) {
      setJoinError(e?.message ?? '参加に失敗しました。');
      return false;
    } finally {
      setJoining(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen text-white relative" style={{ backgroundColor: '#144895' }}>
        <Header />
        <main className="flex flex-col items-center justify-center px-6 py-16">
          <p className="opacity-80">Loading...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-white relative" style={{ backgroundColor: '#144895' }}>
        <Header />
        <main className="flex flex-col items-center justify-center px-6 py-16">
          <p className="text-red-300">Error: {error}</p>
        </main>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen text-white relative" style={{ backgroundColor: '#144895' }}>
        <Header />
        <main className="flex flex-col items-center justify-center px-6 py-16">
          <p className="opacity-90">ログインしてください</p>
          <GoLoginButton />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative flex flex-col" style={{ backgroundColor: '#144895' }}>
      <Header />
      {/* フォームを縦横中央に */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-98">
          <JoinRoomForm onSubmit={handleJoin} onValidChange={setIsValid} />
          {joinError && (
            <p className="text-sm text-red-100/90 bg-red-500/20 rounded-md px-3 py-2 mt-3">{joinError}</p>
          )}
        </div>
      </main>

      {/* 下部固定の送信ボタン */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full px-6">
        <button
          type="submit"
          form="join-form"
          disabled={!isValid || joining}
          className="w-full py-4 rounded-xl bg-cyan-400 text-blue-900 font-semibold disabled:opacity-50 disabled:cursor-not-allowed max-w-[500px] mx-auto"
        >
          {joining ? '参加中…' : '参加する'}
        </button>
      </div>
    </div>
  );
}