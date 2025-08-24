'use client';
import { useRouter } from 'next/navigation';

export default function StartTeamBtn() {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center">
      <div>
        <button
          className="primary-btn min-w-[70px]"
          onClick={() => router.push('/team')}
        >
          開始する
        </button>
      </div>
    </div>
  );
}