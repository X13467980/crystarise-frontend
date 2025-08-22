"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
  toOne?: string;
  toMany?: string;
  className?: string;
};

export default function RoomTypeChooseBtn({
    toOne ='/newroom',
    toMany = '/RoomtypeChooseBtn',
    className = '',
}: Props) {
    const router = useRouter()
    const handleOne = () => router.push(toOne);
    const handleMany = () => router.push(toMany);
    return(
<div className={`flex justify-between items-center w-73 ${className}`}>
  <button
    onClick={handleOne}
    className="flex items-center justify-center w-35 h-40 rounded-xl shadow hover:opacity-90 transition"
    style={{ backgroundColor: '#EAFDFF', color: '#144895' }}
    aria-label="ひとりで"
  >
    <div className="relative w-20 h-20">
      <Image
        src="/oneppl.svg"
        alt="oneppl"
        fill
        className="object-contain"
      />
    </div>
  </button>
  <button
    onClick={handleMany}
    className="flex items-center justify-center w-35 h-40 rounded-xl shadow hover:opacity-90 transition"
    style={{ backgroundColor: '#EAFDFF', color: '#144895' }}
    aria-label="みんなで"
  >
    <div className="relative w-20 h-20">
      <Image
        src="/manyppl.svg"
        alt="manyppl"
        fill
        className="object-contain"
      />
    </div>
  </button>
</div>
    )
}