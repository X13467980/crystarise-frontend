'use client';

type Props = {
  onSoloClick?: () => void;
  onTeamClick?: () => void;
  className?: string;
};

export default function StartButtons({ onSoloClick, onTeamClick, className = '' }: Props) {
  return (
    <div className={`flex flex-col md:flex-row gap-4 w-full max-w-md ${className}`}>
      <button
        onClick={onSoloClick}
        className="flex-1 py-4 rounded-xl font-semibold shadow hover:opacity-90 transition"
        style={{ backgroundColor: '#1CE8FF', color: '#144895' }}
      >
        ひとりで始める
      </button>
      <button
        onClick={onTeamClick}
        className="flex-1 py-4 rounded-xl font-semibold shadow hover:opacity-90 transition"
        style={{ backgroundColor: '#1CE8FF', color: '#144895' }}
      >
        みんなで始める
      </button>
    </div>
  );
}