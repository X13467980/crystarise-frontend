'use client'

import TopBoard from "@/feature/TopBoard/TopBoard";
import { CircularProgressbar ,buildStyles} from 'react-circular-progressbar';
import { CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Image from "next/image";
import MovingCircle from "@/feature/MovingCircle/MovingCircle";
import { RoomDataGetMock } from "@/feature/hooks/rommData.mock";

export default function SoloPage() {
  const percentage = 80;
  const data = RoomDataGetMock()
  return (
      
        <div
      className="bg-[#144794] w-full min-h-screen flex justify-center"
      data-model-id="33:148"
    >
      <div className="bg-[#144794] w-full max-w-[393px] min-h-[852px] relative">
        
        <div className="absolute w-[260px] h-[250px] top-[529px] left-1/2 transform -translate-x-1/2 bg-[#e9fcff] rounded-[25px] border border-solid border-[#1be8ff]">
          <div className="absolute w-[100px] h-20 top-[75px] left-9 bg-[#fffefe] rounded-[10px] border border-solid border-[#f45c5c]">
            <div className="w-[30px] bottom-1 right-1 text-[#f45c5c80] text-2xl absolute h-[60px] [font-family:'851MkPOP-Regular',Helvetica] font-normal flex items-end justify-end tracking-[0] leading-[normal]">
              km
            </div>
          </div>

          <div className="absolute w-[88px] h-[60px] top-[97px] left-[141px]">
            <div className="absolute w-20 h-[60px] top-0 left-2 [font-family:'851MkPOP-Regular',Helvetica] font-normal text-[#144794] text-2xl text-center tracking-[0] leading-[normal]">
              100km
            </div>

            <img
              className="absolute w-[19px] h-[31px] top-[26px] left-0"
              alt="Line"
              src="https://c.animaapp.com/men0codmc27QCa/img/line-17.svg"
            />
          </div>

          <div className="w-[255px] h-5 top-[29px] left-px [font-family:'Inter',Helvetica] text-base text-center absolute font-normal text-[#144794] tracking-[0] leading-[normal]">
            努力の記録を入力しよう
          </div>
          <div className="absolute w-[195px] h-10 top-[185px] left-[33px] bg-[#1be8ff] rounded-[10px]">
            <div className="w-[104px] h-[15px] top-[11px] left-[47px] [font-family:'Inter',Helvetica] text-xs text-center absolute font-normal text-[#144794] tracking-[0] leading-[normal]">
              記録する
            </div>
          </div>
        </div>
        <MovingCircle percentage={percentage}/>
        <TopBoard className="!absolute !left-1/2 !transform !-translate-x-1/2 !top-4" roomName={data.roomName} goalName={data.goalName} goalNumber={data.goalNumber} goalUnit={data.goalUnit}/>
      </div>
    </div>
  );
}