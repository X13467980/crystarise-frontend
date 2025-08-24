'use client';

import { useEffect, useMemo, useRef, useState, use as usePromise } from 'react';
import { useRouter } from 'next/navigation';
import TopBoard from '@/feature/TopBoard/TopBoard';
import MovingCircle from '@/feature/MovingCircle/MovingCircle';
import GroupRecord from '@/feature/GroupRecord/GroupRecord';
import { useAuth } from '@/feature/hooks/useAuth';

export const dynamic = 'force-dynamic';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

type CrystalLite = {
  title: string;
  target_value: number;
  unit: string;
};

type RoomDetail = {
  id: number;
  name: string;
  crystal?: CrystalLite | null;
  crystals?: CrystalLite[]; // API が配列で返す場合の互換
};

// 作成直後の入力値（ドラフト）を読む（ソロと同様の挙動）
function useDraft(roomId?: string) {
  const [draft, setDraft] = useState<{
    roomName?: string;
    goalName?: string;
    goalNumber?: number;
    goalUnit?: string;
  } | null>(null);

  useEffect(() => {
    if (!roomId) return;
    try {
      const raw =
        sessionStorage.getItem(`team:room:${roomId}`) ??
        sessionStorage.getItem(`solo:room:${roomId}`);
      if (raw) setDraft(JSON.parse(raw));
    } catch {
      // 破損時は無視
    }
  }, [roomId]);

  return draft;
}

// crystal サマリーのフォールバック取得
async function fetchCrystalSummary(roomId: string | number, token: string): Promise<CrystalLite | null> {
  try {
    const res = await fetch(
      `${API_BASE}/crystals/by-room/${roomId}/summary`,
      { headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }, cache: 'no-store' }
    );
    if (!res.ok) return null;
    const data = await res.json();
    // 期待形へマッピング（APIが {title,target_value,unit} を返す前提）
    if (data && typeof data === 'object') {
      const title = (data.title ?? data.crystal_title) as string | undefined;
      const target_value = Number(data.target_value ?? data.targetValue);
      const unit = (data.unit ?? data.crystal_unit) as string | undefined;
      if (title && !Number.isNaN(target_value) && unit) {
        return { title, target_value, unit };
      }
    }
    return null;
  } catch {
    return null;
  }
}

export default function GroupRoomPage({
  params,
}: {
  params: Promise<{ room_id: string }>;
}) {
  const { room_id } = usePromise(params);
  const roomIdNum = Number(room_id);

  const router = useRouter();
  const { token, validateToken } = useAuth();

  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState<RoomDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 進捗％（POSTの返却値を反映）
  const [progress, setProgress] = useState<number>(0);

  const fetchedKeyRef = useRef<string | null>(null);

  // validateToken は ref 経由で最新を参照
  const validateTokenRef = useRef(validateToken);
  useEffect(() => {
    validateTokenRef.current = validateToken;
  }, [validateToken]);

  const draft = useDraft(room_id);

  const roomName = room?.name ?? draft?.roomName ?? 'Group Room';
  const goalName = (room?.crystal?.title ?? draft?.goalName) ?? 'Group Goal';
  const goalNumber = (room?.crystal?.target_value ?? draft?.goalNumber) ?? 0;
  const goalUnit = (room?.crystal?.unit ?? draft?.goalUnit) ?? '';

  const percentage = useMemo(() => {
    const pct = Math.max(0, Math.min(100, Math.round(progress)));
    return pct;
  }, [progress]);

  useEffect(() => {
    if (!room_id || !token) return;

    const key = `group:${room_id}:${token}`;
    if (fetchedKeyRef.current === key) return;
    fetchedKeyRef.current = key;

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const ok = await validateTokenRef.current();
        if (!ok) {
          if (!cancelled) {
            setError('ログインが必要です');
            setLoading(false);
          }
          return;
        }

        // 1) まずは /rooms/:id
        const res = await fetch(`${API_BASE}/rooms/${room_id}`, {
          headers: { Authorization: `Bearer ${token}`, accept: 'application/json' },
          cache: 'no-store',
        });

        if (!res.ok) {
          const body: unknown = await res.json().catch(() => null);
          const msg =
            (typeof body === 'object' && body !== null && 'detail' in body
              ? String((body as { detail?: string }).detail ?? '')
              : '') || `HTTP ${res.status}`;
          throw new Error(msg);
        }

        const raw = (await res.json()) as RoomDetail;
        // crystal が無い/配列などのケースを吸収
        let crystal: CrystalLite | null | undefined =
          raw.crystal ??
          (Array.isArray(raw.crystals) && raw.crystals.length > 0 ? raw.crystals[0] : undefined);

        // 2) 無ければ /crystals/by-room/:id/summary をフォールバック
        if (!crystal) {
          crystal = await fetchCrystalSummary(room_id, token);
        }

        const normalized: RoomDetail = {
          id: Number(raw.id),
          name: raw.name ?? (draft?.roomName ?? 'Group Room'),
          crystal: crystal ?? undefined,
        };

        if (!cancelled) {
          setRoom(normalized);
          setLoading(false);
          if (normalized.crystal) {
            try {
              // team/solo どちらのキーも掃除
              sessionStorage.removeItem(`team:room:${room_id}`);
              sessionStorage.removeItem(`solo:room:${room_id}`);
            } catch {
              // noop
            }
          }
        }
      } catch (e: unknown) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : '取得に失敗しました';
          setError(msg);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [room_id, token, roomIdNum]);

  if (!token) {
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
    <div className="bg-[#144794] w-full min-h-screen flex justify-center">
      <div className="bg-[#144794] w-full max-w-[393px] min-h-[852px] relative">
        <GroupRecord
          roomId={roomIdNum}
          goalNumber={goalNumber}
          goalUnit={goalUnit}
          onSubmitted={(pct: number) => {
            setProgress(pct);
            if (pct === 100) {
              router.push('/done100page');
            }
          }}
        />

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