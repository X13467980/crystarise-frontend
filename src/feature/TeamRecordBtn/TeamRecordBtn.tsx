'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TeamRecordBtn() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/teamhomeinput')}
      aria-label="記録入力へ"
    >
      <Image src="/recordbtn.svg" width={60} height={60} alt="RecordBtn" />
    </button>
  );
}

