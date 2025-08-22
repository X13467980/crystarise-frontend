'use client'

import TopBoard from "@/feature/TopBoard/TopBoard";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function SoloPage() {
  const percentage = 66;
  return (
      
        <div
      className="bg-[#144794] w-full min-h-screen flex justify-center"
      data-model-id="33:148"
    >
      <div className="bg-[#144794] w-full max-w-[393px] min-h-[852px] relative">
        <div className="absolute w-[244px] h-[244px] top-[258px] left-1/2 transform -translate-x-1/2 rounded-[122px] border-[10px] border-solid border-[#e9fcff]">
          <img
            className="absolute w-[219px] h-[219px] top-1.5 left-[3px] object-cover"
            alt="Element"
            src="https://c.animaapp.com/men0codmc27QCa/img/----------2025-08-10-23-54-30-2.png"
          />

          <img
            className="absolute w-[127px] h-[127px] -top-2.5 left-[107px]"
            alt="Ellipse"
            src="https://c.animaapp.com/men0codmc27QCa/img/ellipse-4.svg"
          />
        </div>
        
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

        <TopBoard className="!absolute !left-1/2 !transform !-translate-x-1/2 !top-4" />
      </div>
    </div>
  );
}