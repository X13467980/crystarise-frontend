"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
  toOne?: string;
  toMany?: string;
  className?: string;
};

export default function RoomTypeChooseBtn({
  toOne = '/newroom',
  toMany = '/teamroomchoice',
  className = '',
}: Props) {
  const router = useRouter()
  const handleOne = () => router.push(toOne);
  const handleMany = () => router.push(toMany);

  return (
    <div className={`flex flex-row justify-center md:flex-row gap-4 w-full max-w-md ${className}`}>
      <button
        onClick={handleOne}
        aria-label="ひとりで"
        className="rounded-2xl p-4 sm:p-6 md:p-8 hover:opacity-90 transition focus:outline-none focus:ring-4 focus:ring-white/50 bg-[#EAFDFF]"
      >
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
          <Image
            src="/oneppl.svg"
            alt="oneppl"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 4rem, (max-width: 768px) 5rem, (max-width: 1024px) 6rem, 7rem"
          />
        </div>

      </button>
      <button
        onClick={handleMany}
        aria-label="みんなで"
        className="rounded-2xl p-4 sm:p-6 md:p-8 hover:opacity-90 transition focus:outline-none focus:ring-4 focus:ring-white/50 bg-[#EAFDFF]"
      >
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
          <Image
            src="/manyppl.svg"
            alt="manyppl"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 4rem, (max-width: 768px) 5rem, (max-width: 1024px) 6rem, 7rem"
          />
        </div>

      </button>
    </div>
  )
}