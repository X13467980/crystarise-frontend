'use client';

import Image from 'next/image';

type Props = {
  displayName: string;
  avatarUrl?: string | null;
  soloCount: number;
  teamCount: number;
  badgeCount: number;
  className?: string;
};

export default function ProfileCard({
  displayName,
  avatarUrl,
  soloCount,
  teamCount,
  badgeCount,
  className = '',
}: Props) {
  return (
    <section className={`flex items-center gap-6 ${className}`}>
      {avatarUrl ? (
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-white/10 shrink-0">
          <Image src={avatarUrl} alt="avatar" fill className="object-cover" />
        </div>
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-300/80 shrink-0" />
      )}
      <div className="flex flex-col gap-2">
        <h2 className="font-mkpop text-2xl tracking-wide">{displayName}</h2>
        <div className="flex gap-8 text-center">
          <div>
            <div className="text-3xl font-bold">{soloCount}</div>
            <div className="text-sm opacity-80">ひとりで</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{teamCount}</div>
            <div className="text-sm opacity-80">みんなで</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{badgeCount}</div>
            <div className="text-sm opacity-80">バッジ数</div>
          </div>
        </div>
      </div>
    </section>
  );
}