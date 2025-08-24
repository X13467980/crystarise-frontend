// 変更点のみ抜粋
'use client';

import Header from "@/feature/Header/Header";
import TopBoard from "@/feature/TopBoard/TopBoard";
import UserCircleList, { User } from "@/feature/UserCircleList/UserCircleList";
import StartTeamBtn from "@/feature/StartTeamBtn/StartTeamBtn";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/feature/hooks/useAuth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

type RoomDetail = {
    id: number;
    name: string;
    password?: string | null;
    crystal?: { title: string; target_value: number; unit: string };
};

export default function Lobby() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const roomIdParam = searchParams.get("room_id");
    const roomId = roomIdParam ? Number(roomIdParam) : undefined;

    const { token, isAuthenticated, validateToken, logout } = useAuth();
    const [room, setRoom] = useState<RoomDetail | null>(null);
    const [loading, setLoading] = useState(true);

    // 1) ドラフト即時表示
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
            } catch { }
        }
    }, [roomId]);

    // 2) 正式データ取得（403時はjoinして再試行）
    useEffect(() => {
        if (!roomId) return;
        let aborted = false;

        const fetchRoom = async (): Promise<Response> => {
            return fetch(`${API_BASE}/rooms/${roomId}`, {
                cache: "no-store",
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
        };

        (async () => {
            setLoading(true);
            try {
                // 認証チェック（未ログイン/期限切れならログアウトしてログイン導線）
                if (!isAuthenticated || !(await validateToken()) || !token) {
                    logout();
                    router.push("/lobby");
                    return;
                }

                // まずは通常フェッチ
                let res = await fetchRoom();

                // 403 → join 試行（ドラフトのパスワードを使用）
                if (res.status === 403) {
                    try {
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

                        // パスワードがあるなら join を試す
                        if (roomPassword) {
                            const joinRes = await fetch(`${API_BASE}/rooms/join`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({ room_id: roomId, password: roomPassword }),
                            });

                            // join 成功時に再フェッチ
                            if (joinRes.ok) {
                                res = await fetchRoom();
                            } else {
                                // join 失敗詳細を出す
                                const joinText = await joinRes.text().catch(() => "");
                                throw new Error(`Join failed: HTTP ${joinRes.status} ${joinText}`);
                            }
                        }
                    } catch (e) {
                        console.error("[Lobby] join attempt failed:", e);
                    }
                }

                if (!res.ok) {
                    // 詳細をログに
                    const txt = await res.text().catch(() => "");
                    throw new Error(`HTTP ${res.status} ${txt || ""}`);
                }

                const data = (await res.json()) as any;

                const normalized: RoomDetail = {
                    id: data?.id ?? roomId,
                    name: data?.name ?? "",
                    password:
                        data?.password ?? data?.room?.password ?? null,
                    crystal: data?.crystal
                        ? {
                            title: data.crystal.title ?? "",
                            target_value: Number(data.crystal.target_value ?? 0),
                            unit: data.crystal.unit ?? "",
                        }
                        : undefined,
                };

                if (!aborted) setRoom(normalized);
            } catch (e) {
                if (!aborted) {
                    console.error("[Lobby] fetch room failed:", e);
                    alert("ルーム情報の取得に失敗しました。アクセス権限やログイン状態をご確認ください。");
                }
            } finally {
                if (!aborted) setLoading(false);
            }
        })();

        return () => {
            aborted = true;
        };
    }, [roomId, token, isAuthenticated, validateToken, logout, router]);

    const sampleUsers: User[] = useMemo(
        () => [
            { id: "1", username: "矢野陽大" },
            { id: "5", username: "K" },
            { id: "6", username: "RINO" },
            { id: "7", username: "JP" },
        ],
        []
    );

    return (
        <div className="relative min-h-screen">
            <Header />

            {/* 下部固定ボタンに被らない余白 */}
            <div className="pb-28 [padding-bottom:calc(env(safe-area-inset-bottom)+7rem)]">
                <div className="flex justify-center">
                    <TopBoard
                        roomName={room?.name ?? (loading ? "Loading..." : "")}
                        goalName={room?.crystal?.title ?? ""}
                        goalNumber={room?.crystal?.target_value ?? 0}
                        goalUnit={room?.crystal?.unit ?? ""}
                    />
                </div>

                <p className="text-center mt-5 pb-3 border-b border-[#EAFDFF] text-[#EAFDFF]">
                    ルームID: {roomId ?? "-"}　Password: {room?.password ?? "(非表示)"}
                </p>

                <div className="w-full min-h-screen flex justify-center">
                    <UserCircleList users={sampleUsers} />
                </div>
            </div>

            {/* === 画面下部固定バー === */}
            <div className="fixed bottom-0 inset-x-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] bg-[#144895]/80 backdrop-blur">
                <StartTeamBtn />
            </div>
        </div>
    )
}