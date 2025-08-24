'use client';
import { useRouter } from 'next/navigation';

type Props = {
  roomId: number | string;  // 必須（呼び出し元で必ず渡す）
  label?: string;
};

export default function StartTeamBtn({ roomId, label = '開始する' }: Props) {
  const router = useRouter();

  const handleClick = () => {
    const id = String(roomId ?? '').trim();
    if (!id) {
      console.error('roomId が無効です');
      return;
    }
    router.push(`/group/rooms/${id}`);
  };

  return (
    <div className="w-full flex justify-center">
      <div>
        <button
          className="primary-btn min-w-[70px]"
          onClick={handleClick}
        >
          {label}
        </button>
      </div>
    </div>
  );
}