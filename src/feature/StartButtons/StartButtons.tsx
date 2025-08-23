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
    <div className={`flex flex-row justify-center md:flex-row gap-4 w-full max-w-md ${className}`}>
      <button
        onClick={handleFirst}
        aria-label="初めから"
        className="rounded-2xl p-4 sm:p-6 md:p-8 hover:opacity-90 transition focus:outline-none focus:ring-4 focus:ring-white/50 bg-[#EAFDFF]"
      >
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
          <Image
            src="/gofirst.svg"
            alt="GoFirstImg"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 4rem, (max-width: 768px) 5rem, (max-width: 1024px) 6rem, 7rem"
          />
        </div>
      </button>

      {/* 続きから */}
      <button
        onClick={handleContinue}
        aria-label="続きから"
        className="rounded-2xl p-4 sm:p-6 md:p-8 hover:opacity-90 transition focus:outline-none focus:ring-4 focus:ring-white/50 bg-[#EAFDFF]"
      >
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
          <Image
            src="/recycle.svg"
            alt="recycle"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 4rem, (max-width: 768px) 5rem, (max-width: 1024px) 6rem, 7rem"
          />
        </div>
      </button>
    </div>
  );
}
