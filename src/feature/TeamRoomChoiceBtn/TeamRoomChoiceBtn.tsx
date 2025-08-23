"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
  makeOne?: string;
  joinRoom?: string;
  className?: string;
};

export default function TeamRoomChoiceBtn({
    makeOne ='/newroom',
    joinRoom = '/join',
    className = '',
}: Props) {
    const router = useRouter()
    const handleMake = () => router.push(makeOne);
    const handleJoin = () => router.push(joinRoom);
    return(
<div className={`flex justify-between items-center w-73 ${className}`}>
  <button
    onClick={handleMake}
    className="flex items-center justify-center w-35 h-40 rounded-xl shadow hover:opacity-90 transition"
    style={{ backgroundColor: '#EAFDFF', color: '#144895' }}
    aria-label="ひとりで"
  >
    <div className="relative w-20 h-20">
      <Image
        src="/makeOne.svg"
        alt="oneppl"
        fill
        className="object-contain"
      />
    </div>
  </button>
  <button
    onClick={handleJoin}
    className="flex items-center justify-center w-35 h-40 rounded-xl shadow hover:opacity-90 transition"
    style={{ backgroundColor: '#EAFDFF', color: '#144895' }}
    aria-label="みんなで"
  >
    <div className="relative w-20 h-20">
      <Image
        src="/Join.svg"
        alt="manyppl"
        fill
        className="object-contain"
      />
    </div>
  </button>
</div>
    )
};