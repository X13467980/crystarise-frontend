'use client';

import { useRouter } from 'next/navigation';

export default function NewRoomButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/solo'); // solo.tsx へ遷移
  };

  return (
    <div>
      <button
        type="button"
        className="primary-btn w-full"
        onClick={handleClick}
      >
        作成する
      </button>
    </div>
  );
}
