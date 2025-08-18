'use client';

import { useRouter } from 'next/navigation';

type Props = {
  onSoloClick?: () => void;
  onTeamClick?: () => void;
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
    onSoloClick?.();
    router.push(toSolo);
  };

  const handleTeam = () => {
    onTeamClick?.();
    router.push(toTeam);
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