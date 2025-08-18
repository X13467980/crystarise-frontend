'use client';

import { useRouter } from 'next/navigation';

type Props = {
  /** クリック時に追加で実行したい処理（遷移は内部で行う） */
  onSoloClick?: () => void;
  onTeamClick?: () => void;
  /** 遷移先のパス（デフォルト /solo, /team） */
  toSolo?: string;
  toTeam?: string;
  className?: string;
};

export default function StartButtons({
  onSoloClick,
  onTeamClick,
  toSolo = '/solo',
  toTeam = '/team',
  className = '',
}: Props) {
  const router = useRouter();

  const handleSolo = () => {
    onSoloClick?.();       // 追加処理（任意）
    router.push(toSolo);   // 既定は /solo
  };

  const handleTeam = () => {
    onTeamClick?.();       // 追加処理（任意）
    router.push(toTeam);   // 既定は /team
  };

  return (
    <div className={`flex flex-col md:flex-row gap-4 w-full max-w-md ${className}`}>
      <button
        onClick={handleSolo}
        className="flex-1 py-4 rounded-xl font-semibold shadow hover:opacity-90 transition"
        style={{ backgroundColor: '#1CE8FF', color: '#144895' }}
        aria-label="ひとりで始める"
      >
        ひとりで始める
      </button>

      <button
        onClick={handleTeam}
        className="flex-1 py-4 rounded-xl font-semibold shadow hover:opacity-90 transition"
        style={{ backgroundColor: '#1CE8FF', color: '#144895' }}
        aria-label="みんなで始める"
      >
        みんなで始める
      </button>
    </div>
  );
}