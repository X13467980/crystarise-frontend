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
<div className={`flex flex-row gap-4 flex-wrap justify-center ${className}`}>
  <button
    onClick={handleFirst}
    className="min-w-[120px] px-4 py-3 rounded-xl font-semibold shadow hover:opacity-90 transition"
    style={{ backgroundColor: '#EAFDFF', color: '#144895' }}
    aria-label="初めから"
  >
      <div className="h-20 flex items-center justify-center">
        <Image
          src="/gofirst.svg"
          width={80}
          height={80}
          alt="GoFirstImg"
        />
      </div>
      <span className="font-mkpop font-normal text-lg">初めから</span>
  </button>

  <button
    onClick={handleContinue}
    className="min-w-[120px] px-4 py-3 rounded-xl font-semibold shadow hover:opacity-90 transition"
    style={{ backgroundColor: '#EAFDFF', color: '#144895' }}
    aria-label="続きから"
  >
      <div className="h-20 flex items-center justify-center">
        <Image
          src="/recycle.svg"
          width={60}
          height={60}
          alt="recycle"
        />
      </div>
      <span className="font-mkpop font-normal text-lg">続きから</span>
  </button>
</div>
  );
}