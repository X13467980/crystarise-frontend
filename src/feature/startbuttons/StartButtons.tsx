'use client';

import { useRouter } from 'next/navigation';

type Props = {
  toFirst?: string;
  toContinue?: string;
  className?: string;
};

export default function StartButtons({
  toFirst = '/firsttime',
  toContinue = '/continue',
  className = '',
}: Props) {
  const router = useRouter();

  const handleFirst = () => {
    router.push(toFirst);
  };

  const handleContinue = () => {
    router.push(toContinue);
  };

  return (
    <div className={`flex flex-col md:flex-row gap-4 w-full max-w-md ${className}`}>
      <button
        onClick={handleFirst}
        className="flex-1 py-4 rounded-xl font-semibold shadow hover:opacity-90 transition"
        style={{ backgroundColor: '#1CE8FF', color: '#144895' }}
        aria-label=""
      >
        ひとりで始める
      </button>

      <button
        onClick={handleContinue}
        className="flex-1 py-4 rounded-xl font-semibold shadow hover:opacity-90 transition"
        style={{ backgroundColor: '#1CE8FF', color: '#144895' }}
        aria-label="みんなで始める"
      >
        みんなで始める
      </button>
    </div>
  );
}