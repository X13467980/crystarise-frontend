// src/app/lobby/[room_id]/page.tsx
'use client';

import Header from '@/feature/Header/Header';
import TopBoard from '@/feature/TopBoard/TopBoard';
import UserCircleList, { User } from '@/feature/UserCircleList/UserCircleList';
import StartTeamBtn from '@/feature/StartTeamBtn/StartTeamBtn';
import { useEffect, useMemo, useState, use as usePromise } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/feature/hooks/useAuth';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

type RoomDetail = {
  id: number;
  name: string;
  password?: string | null;
  crystal?: { title: string; target_value: number; unit: string };
};

export default function LobbyPage({
  params,
}: {
  params: Promise<{ room_id: string }>;
}) {
  const { room_id } = usePromise(params);
  const roomId = Number(room_id);

  const router = useRouter();
  const { token, isAuthenticated, validateToken /* , logout */ } = useAuth();

  const [room, setRoom] = useState<RoomDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // ★ 追加：Auth の検証完了フラグ
  const [authChecked, setAuthChecked] = useState(false);

  // 0) 認証検証（ここで logout や push はしない）
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // useAuth 実装によっては isAuthenticated が初期 false のことがあるため、
        // validateToken を必ず一度実行して「確定させる」
        await validateToken();
      } finally {
        if (!cancelled) setAuthChecked(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [validateToken]);

  // 1) draft 即時表示
  useEffect(() => {
    if (!roomId) return;
    const keys = [`solo:room:${roomId}`, `group:room:${roomId}`];
    for (const key of keys) {
      try {
        const raw = sessionStorage.getItem(key);
        if (raw) {
          const d = JSON.parse(raw);
          setRoom({
            id: roomId,
            name: d.roomName ?? '',
            password: d.roomPassword ?? null,
            crystal: d.goalName
              ? {
                  title: d.goalName ?? '',
                  target_value: Number(d.goalNumber ?? 0),
                  unit: d.goalUnit ?? '',
                }
              : undefined,
          });
          break;
        }
      } catch {}
    }
  }, [roomId]);

  // 2) 正式データ取得（403時は join → 再フェッチ）
  useEffect(() => {
    if (!roomId) return;
    if (!authChecked) return;               // ★ Auth 検証が終わるまで待つ

    let aborted = false;

    const fetchRoom = () =>
      fetch(`${API_BASE}/rooms/${roomId}`, {
        cache: 'no-store',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

    (async () => {
      setLoading(true);
      try {
        // 未ログインなら API 叩かず UI 側で案内
        if (!isAuthenticated || !token) {
          return;
        }

        let res = await fetchRoom();

        if (res.status === 403) {
          try {
            // draft からパスワード検索
            const keys = [`solo:room:${roomId}`, `group:room:${roomId}`];
            let roomPassword: string | null = null;
            for (const key of keys) {
              const raw = sessionStorage.getItem(key);
              if (raw) {
                const d = JSON.parse(raw);
                roomPassword = d?.roomPassword ?? null;
                if (roomPassword) break;
              }
            }
            if (roomPassword) {
              const joinRes = await fetch(`${API_BASE}/rooms/join`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ room_id: roomId, password: roomPassword }),
              });
              if (joinRes.ok) {
                res = await fetchRoom();
              } else {
                const t = await joinRes.text().catch(() => '');
                throw new Error(`Join failed: HTTP ${joinRes.status} ${t}`);
              }
            }
          } catch (e) {
            console.error('[Lobby] join attempt failed:', e);
          }
        }

        if (!res.ok) {
          const txt = await res.text().catch(() => '');
          throw new Error(`HTTP ${res.status} ${txt || ''}`);
        }

        const data = (await res.json()) as any;
        const normalized: RoomDetail = {
          id: data?.id ?? roomId,
          name: data?.name ?? '',
          password: data?.password ?? data?.room?.password ?? null,
          crystal: data?.crystal
            ? {
                title: data.crystal.title ?? '',
                target_value: Number(data.crystal.target_value ?? 0),
                unit: data.crystal.unit ?? '',
              }
            : undefined,
        };

        if (!aborted) setRoom(normalized);
      } catch (e) {
        if (!aborted) {
          console.error('[Lobby] fetch room failed:', e);
          // 未ログインで来る 401/403 はここではアラート出さない（静かに UI 案内）
        }
      } finally {
        if (!aborted) setLoading(false);
      }
    })();

    return () => {
      aborted = true;
    };
  }, [roomId, token, isAuthenticated, authChecked]);

  const sampleUsers: User[] = useMemo(
    () => [
      { id: '1', username: '矢野陽大' },
      { id: '5', username: 'K' },
      { id: '6', username: 'RINO' },
      { id: '7', username: 'JP' },
    ],
    []
  );

  // === 未ログイン時の表示（自動リダイレクトしない） ===
  if (authChecked && (!isAuthenticated || !token)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Header />
        <p className="text-white/90">このルームを見るにはログインが必要です。</p>
        <button
          className="primary-btn"
          onClick={() => router.push('/login')}
        >
          ログインする
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Header />

      {/* ボタンに被らない余白 */}
      <div className="pb-28 [padding-bottom:calc(env(safe-area-inset-bottom)+7rem)]">
        <div className="flex justify-center">
          <TopBoard
            roomName={room?.name ?? (loading ? 'Loading...' : '')}
            goalName={room?.crystal?.title ?? ''}
            goalNumber={room?.crystal?.target_value ?? 0}
            goalUnit={room?.crystal?.unit ?? ''}
          />
        </div>

        <p className="text-center mt-5 pb-3 border-b border-[#EAFDFF] text-[#EAFDFF]">
          ルームID: {roomId}　Password: {room?.password ?? '(非表示)'}
        </p>

        <div className="w-full min-h-screen flex justify-center">
          <UserCircleList users={sampleUsers} />
        </div>
      </div>

      {/* 画面下部固定ボタン */}
      <div className="fixed bottom-0 inset-x-0 z-50">
        <div
          className="mx-auto w-full max-w-[480px] px-4 pt-2 pb-[calc(env(safe-area-inset-bottom)+12px)]
                     bg-[#144895]/80 backdrop-blur supports-[backdrop-filter]:bg-[#144895]/60"
        >
          <StartTeamBtn />
        </div>
      </div>
    </div>
  );
}