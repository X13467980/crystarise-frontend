'use client'

import TopBoard from "@/feature/TopBoard/TopBoard";
import 'react-circular-progressbar/dist/styles.css';
import MovingCircle from "@/feature/MovingCircle/MovingCircle";
import { RoomDataGetMock } from "@/feature/hooks/rommData.mock";
import SoloRecord from "@/feature/SoloRecord/SoloRecord";


export default function SoloPage() {
  const percentage = 70;
  const data = RoomDataGetMock()
  return (
      
        <div
      className="bg-[#144794] w-full min-h-screen flex justify-center"
      data-model-id="33:148"
    >
      <div className="bg-[#144794] w-full max-w-[393px] min-h-[852px] relative">
        <MovingCircle percentage={percentage}/>
        <TopBoard className="!absolute !left-1/2 !transform !-translate-x-1/2 !top-4" roomName={data.roomName} goalName={data.goalName} goalNumber={data.goalNumber} goalUnit={data.goalUnit}/>
        <SoloRecord />
      </div>
    </div>
  );
}