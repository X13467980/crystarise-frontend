// src/app/join/page.tsx など（JoinPage）
'use client';

import Header from '@/feature/Header/Header';
import { useUserSummary } from '@/feature/hooks/useUserSummary';
import GoLoginButton from '@/feature/GoLogin/GoLoginButton';
import LogoutButton from '@/feature/Logout/LogoutButton';
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

      // 成功したらそのルームのページへ（パスはお好みで）
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
    <div className="min-h-screen text-white relative" style={{ backgroundColor: '#144895' }}>
      <Header />
      <div className="flex justify-center">
        <main className="flex flex-col flex-1 items-center justify-center max-w-98 gap-4">
          <JoinRoomForm onSubmit={handleJoin} onValidChange={setIsValid} />
          {joinError && (
            <p className="text-sm text-red-100/90 bg-red-500/20 rounded-md px-3 py-2">{joinError}</p>
          )}
        </main>
      </div>

      {/* 既存の下部固定ボタン想定。form 属性でフォーム送信 */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
        <button
          type="submit"
          form="join-form"
          disabled={!isValid || joining}
          className="px-10 py-4 rounded-xl bg-cyan-400 text-blue-900 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {joining ? '参加中…' : '参加する'}
        </button>
      </div>

      {data && (
        <div className="fixed bottom-8 left-4">
          <LogoutButton className="px-3 py-2 text-sm whitespace-nowrap" />
        </div>
      )}
    </div>
  );
}