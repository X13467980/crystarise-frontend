"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
  toOne?: string;
  toMany?: string;
  className?: string;
};

export default function RoomTypeChooseBtn({
    toOne ='/',
    toMany = '/',
    className = '',
}: Props) {
    const router = useRouter()
    const handleOne = () => router.push(toOne);
    const handleMany = () => router.push(toMany);
    return(
<div className={`flex flex-row justify-center md:flex-row gap-4 w-full max-w-md ${className}`}>
  <button
    onClick={handleOne}
    className="min-w-[120px] px-19 py-8 rounded-xl font-semibold shadow hover:opacity-90 transition"
    style={{ backgroundColor: '#EAFDFF', color: '#144895' }}
    aria-label="ひとりで"
  >
      <div className="h-20 flex items-center justify-center">
        <Image
          src="/oneppl.svg"
          width={30}
          height={50}
          alt="oneppl"
        />
      </div>
      <span className="font-mkpop font-normal text-lg">ひとりで</span>
  </button>
  <button
    onClick={handleMany}
    className="min-w-[120px] px-17 py-8 rounded-xl font-semibold shadow hover:opacity-90 transition"
    style={{ backgroundColor: '#EAFDFF', color: '#144895' }}
    aria-label="みんなで"
  >
      <div className="h-20 flex items-center justify-center">
        <Image
          src="/manyppl.svg"
          width={60}
          height={60}
          alt="manyppl"
        />
      </div>
      <span className="font-mkpop font-normal text-lg">みんなで</span>
  </button>
</div>
    )
}