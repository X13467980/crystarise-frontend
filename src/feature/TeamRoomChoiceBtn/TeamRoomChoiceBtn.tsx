"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
  makeOne?: string;
  joinRoom?: string;
  className?: string;
};

export default function TeamRoomChoiceBtn({
  makeOne = '/newroom/group',
  joinRoom = '/join',
  className = '',
}: Props) {
  const router = useRouter()
  const handleMake = () => router.push(makeOne);
  const handleJoin = () => router.push(joinRoom);
  return (
    <div className={`flex flex-row justify-center md:flex-row gap-4 w-full max-w-md ${className}`}>
      <button
        onClick={handleMake}
        aria-label="新規作成"
        className="rounded-2xl p-4 sm:p-6 md:p-8 hover:opacity-90 transition focus:outline-none focus:ring-4 focus:ring-white/50 bg-[#EAFDFF]"
      >

        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
          <Image
            src="/makeOne.svg"
            alt="oneppl"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 4rem, (max-width: 768px) 5rem, (max-width: 1024px) 6rem, 7rem"
          />
        </div>

      </button>
      <button
        onClick={handleJoin}
        aria-label="参加する"
        className="rounded-2xl p-4 sm:p-6 md:p-8 hover:opacity-90 transition focus:outline-none focus:ring-4 focus:ring-white/50 bg-[#EAFDFF]"
      >
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
          <Image
            src="/Join.svg"
            alt="manyppl"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 4rem, (max-width: 768px) 5rem, (max-width: 1024px) 6rem, 7rem"
          />
        </div>
      </button>
    </div>
  )
};