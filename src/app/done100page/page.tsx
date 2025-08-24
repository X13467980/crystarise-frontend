"use client"
import Header from "@/feature/Header/Header"
import Image from "next/image"
import Link from "next/link"
import TopBoard from "@/feature/TopBoard/TopBoard"
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/feature/hooks/useAuth";
import { useEffect, useState } from "react";

type Room = {
    name: string;
    crystal?: {
        title?: string;
        target_value?: number;
        unit?: string;
    };
};

export default function Done100Page() {
    const searchParams = useSearchParams();
    const roomId = searchParams.get('roomId') ?? 'demo'; // fallback
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

    const { token } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
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
        <>
            <div>
                <div className='absolute inset-0' style={{ height: 'fit-content' }}>
                    <Header />
                </div>
                <div className="m-auto px-12 max-w-100 min-h-screen h-screen flex flex-col items-center" style={{ backgroundColor: '#144895' }}>
                    <div className="flex flex-col h-full justify-between items-center pb-10">
                        <div className="h-full flex flex-col items-center justify-center space-y-4 pt-28">
                            <p className="font-mkpop text-[var(--secondary)] text-[24px]">100% 達成！</p>
                            <Image
                                src="/fullsnowflake.svg"
                                width={287}
                                height={289}
                                alt="snowflake"
                            />
                            <Image
                                src="/information.svg"
                                width={164}
                                height={24}
                                alt="information"
                                onClick={() => setIsModalOpen(true)}
                            />
                        </div>
                        <Link
                            href="/getbadge100"
                            className="primary-btn text-center space-y-4"
                        >
                            次へ
                        </Link>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="absolute inset-0 flex items-center justify-center" onClick={() => setIsModalOpen(false)}>
                    <TopBoard
                        roomName={roomName}
                        goalName={goalName}
                        goalNumber={goalNumber}
                        goalUnit={goalUnit}
                    />
                </div>
            )}
        </>
    )
}