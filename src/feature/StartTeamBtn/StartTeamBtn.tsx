'use client';
import { useRouter } from 'next/navigation';

type Props = {
  /** 遷移先の roomId（必須） */
  roomId: number | string;
  /** ボタンラベル（任意） */
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