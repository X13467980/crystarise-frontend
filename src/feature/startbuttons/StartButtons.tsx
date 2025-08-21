'use client';

import { useRouter } from 'next/navigation';
import Image from "next/image"

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
        className="flex-1 flex flex-col justify-center items-center py-4 rounded-xl font-semibold shadow hover:opacity-90 transition"
        style={{ backgroundColor: '#EAFDFF', color: '#144895' }}
        aria-label="初めから"
      >
      <div className="h-24">
        <Image
          src="/gofirst.svg"
          width={100}
          height={100}
          alt="GoFirstImg"
        />
      </div>
        <span >初めから</span>
      </button>

      <button
        onClick={handleContinue}
        className="flex-1 flex flex-col justify-center items-center py-4 rounded-xl font-semibold shadow hover:opacity-90 transition"
        style={{ backgroundColor: '#EAFDFF', color: '#144895' }}
        aria-label="続きから"
      >
      <div className="h-24">
        <Image
          src="/recycle.svg"
          width={70}
          height={70}
          alt="recycle"
          className="mt-4"
        />
      </div>
        <span>続きから</span>
      </button>
    </div>
  );
}