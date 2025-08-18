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
        className="flex-1 py-4 rounded-xl bg-white text-[#144895] font-semibold shadow hover:bg-gray-100 transition"
      >
        一人で始める
      </button>
      <button
        onClick={onTeamClick}
        className="flex-1 py-4 rounded-xl bg-yellow-400 text-[#144895] font-semibold shadow hover:bg-yellow-300 transition"
      >
        みんなで始める
      </button>
    </div>
  );
}