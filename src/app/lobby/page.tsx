'use client';

import Header from "@/feature/Header/Header";
import TopBoard from "@/feature/TopBoard/TopBoard";
import UserCircleList, { User } from "@/feature/UserCircleList/UserCircleList";
import StartTeamBtn from "@/feature/StartTeamBtn/StartTeamBtn";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/feature/hooks/useAuth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

type RoomDetail = {
  id: number;
  name: string;
  password?: string | null;
  crystal?: {
    title: string;
    target_value: number;
    unit: string;
  };
};

export default function Lobby() {
  const searchParams = useSearchParams();
  const roomIdParam = searchParams.get("room_id");
  const roomId = roomIdParam ? Number(roomIdParam) : undefined;

  const { token } = useAuth();
  const [room, setRoom] = useState<RoomDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // 1) 直前作成時ドラフトを即時表示（存在すれば）
  useEffect(() => {
    if (!roomId) return;

    // solo / group どちらでも拾えるように両方見る
    const draftKeys = [`solo:room:${roomId}`, `group:room:${roomId}`];
    for (const key of draftKeys) {
      try {
        const raw = sessionStorage.getItem(key);
        if (raw) {
          const d = JSON.parse(raw);
          setRoom({
            id: roomId,
            name: d.roomName ?? "",
            password: d.roomPassword ?? null,
            crystal: d.goalName
              ? {
                  title: d.goalName ?? "",
                  target_value: Number(d.goalNumber ?? 0),
                  unit: d.goalUnit ?? "",
                }
              : undefined,
          });
          break;
        }
      } catch {}
    }
  }, [roomId]);

  // 2) API から正式データを取得して上書き
  useEffect(() => {
    if (!roomId) return;
    let aborted = false;

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/rooms/${roomId}`, {
          cache: "no-store",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as RoomDetail | any;

        const normalized: RoomDetail = {
          id: data?.id ?? roomId,
          name: data?.name ?? room?.name ?? "",
          password: data?.password ?? data?.room?.password ?? room?.password ?? null,
          crystal: data?.crystal
            ? {
                title: data.crystal.title ?? "",
                target_value: Number(data.crystal.target_value ?? 0),
                unit: data.crystal.unit ?? "",
              }
            : room?.crystal,
        };

        if (!aborted) setRoom(normalized);
      } catch (e) {
        console.error("[Lobby] fetch room failed:", e);
      } finally {
        if (!aborted) setLoading(false);
      }
    })();

    return () => {
      aborted = true;
    };
  }, [roomId, token]); // room に依存させない

  // ダミー（今は固定）ユーザー
  const sampleUsers: User[] = useMemo(
    () => [
      { id: "1", username: "矢野陽大" },
      { id: "2", username: "りの", avatarUrl: "/avatars/rino.png" },
      { id: "3", username: "YOTABO" },
      { id: "4", username: "矢野クリスタル YOTABO" },
      { id: "5", username: "飛島JP" },
      { id: "6", username: "RINO" },
      { id: "7", username: "YANOさん" },
      { id: "8", username: "ここ" },
      { id: "9", username: "Ksan" },
      { id: "10", username: "飛島Japan" },
    ],
    []
  );

  return (
    <div>
      <Header />

      <div className="flex justify-center">
        <TopBoard
          roomName={room?.name ?? ""}
          goalName={room?.crystal?.title ?? ""}
          goalNumber={room?.crystal?.target_value ?? 0}
          goalUnit={room?.crystal?.unit ?? ""}
        />
      </div>

      <p className="text-center mt-5 pb-3 border-b border-[#EAFDFF] text-[#EAFDFF]">
        ルームID: {roomId ?? "-"}　
        Password: {room?.password ?? "(非表示)"}
      </p>

      <div className="w-full min-h-screen flex justify-center">
        <UserCircleList users={sampleUsers} />
      </div>

      <StartTeamBtn />
    </div>
  );
}