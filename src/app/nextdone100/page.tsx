// src/app/nextdone100/page.tsx
import Header from "@/feature/Header/Header";
import Image from "next/image";
import Link from "next/link";
import TopBoard from "@/feature/TopBoard/TopBoard";

type Room = {
  name: string;
  crystal?: {
    title?: string;
    target_value?: number;
    unit?: string;
  };
};

async function getRoom(roomId: string): Promise<Room | null> {
  // Put your API base in .env.local, e.g.:
  // API_BASE=https://api.yourdomain.com
  const base = process.env.API_BASE;
  if (!base) {
    console.error("Missing API_BASE in env");
    return null;
  }

  try {
    const res = await fetch(`${base}/rooms/${roomId}`, {
      // always get fresh result in dev / on this page
      cache: "no-store",
      // if you need auth, add headers here
      // headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
    });

    if (!res.ok) {
      console.error("Failed to fetch room:", res.status, await res.text());
      return null;
    }

    const data = (await res.json()) as Room;
    return data ?? null;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

// Accept searchParams so we can read ?roomId=...
export default async function NextDone100({
  searchParams,
}: {
  searchParams?: { roomId?: string };
}) {
  const roomId = searchParams?.roomId ?? "demo"; // fallback
  const room = await getRoom(roomId);

  const roomName   = room?.name ?? "Room";
  const goalName   = room?.crystal?.title ?? "Goal";
  const goalNumber = room?.crystal?.target_value ?? 0;
  const goalUnit   = room?.crystal?.unit ?? "";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 grid place-items-center px-4">
        <div className="w-72 flex flex-col items-center gap-5">
          <p className="font-mkpop text-4xl">100% 達成！</p>

          <Image src="/fullsnowflake.svg" width={287} height={289} alt="snowflake" />
          <Image src="/information.svg" width={164} height={24} alt="information" />

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
