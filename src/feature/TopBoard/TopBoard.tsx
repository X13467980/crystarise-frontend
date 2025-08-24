'use client';

import Image from "next/image";

type Props = {
  roomName: string;
  goalName: string;
  goalNumber: number;
  goalUnit: string;
  className?: string;
};

export default function TopBoard({
  roomName,
  goalName,
  goalNumber,
  goalUnit,
  className = "",
}: Props) {
  return (
    <div className={`relative w-[383px] h-[216px] overflow-hidden ${className}`}>
      <Image
        src="/topboard.svg"
        alt=""
        fill
        sizes="383px"
        className="absolute inset-0 object-cover -z-10 pointer-events-none"
        priority
      />

      <div className="absolute w-[360px] h-40 top-14 left-4 bg-[#e9fcff] rounded-[25px] z-10">
        <div className="absolute top-[19px] left-1/2 -translate-x-1/2 max-w-[320px] px-2 text-2xl text-center truncate font-mkpop text-[#144794]">
          <p title={roomName}>{roomName}</p>
        </div>

        <div className="absolute w-[100px] h-20 top-[57px] left-[22px] bg-[#f7feff] rounded-[10px] border border-solid border-[#1be8ff]">
          <div className="absolute w-20 top-2 left-[9px] text-base font-mkpop text-[#144794] break-words">
            {goalName}
          </div>
        </div>

        <div className="absolute w-[217px] h-20 top-[57px] left-[130px]">
          <div className="absolute w-[100px] h-20 top-0 left-0 bg-[#fffefe] rounded-[10px] border border-solid border-[#f45c5c]" />
          <div className="absolute w-[100px] h-20 top-0 left-[108px] bg-[#f7feff] rounded-[10px] border border-solid border-[#1be8ff]" />

          <div className="absolute w-[82px] h-[60px] top-[10px] left-2 font-mkpop text-[#f45c5c] text-4xl flex items-center justify-center">
            {goalNumber}
          </div>

          <div className="absolute w-[118px] h-[60px] top-[10px] left-[99px] font-mkpop text-[#144794] text-4xl flex items-center justify-center">
            {goalUnit}
          </div>
        </div>
      </div>
    </div>
  );
}