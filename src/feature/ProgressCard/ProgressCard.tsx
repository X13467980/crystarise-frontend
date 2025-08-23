'use client';

import Image from "next/image";

export default function ProgressCard() {
    const progress = 50;
  return (
    <div className="min-h-screen flex justify-center items-end">
      <div className="bg-[#eefdff]/45 backdrop-blur-md rounded-[20px] border border-white/35 shadow-[0_4px_8px_rgba(0,0,0,0.2)] w-[260px] h-[248px] p-4 space-y-3">
        <div className="flex items-center" >
            <Image 
            src="/usericon.svg"
            width={32}
            height={32}
            />
            <div className="ml-5 w-full h-2 bg-white/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1CE8FF] transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        </div>
        </div>
        
    </div>
  );
}