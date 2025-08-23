'use client'

import TopBoard from "@/feature/TopBoard/TopBoard";
import MovingCircle from "@/feature/MovingCircle/MovingCircle";
import { RoomDataGetMock } from "@/feature/hooks/rommData.mock";
import SoloRecord from "@/feature/SoloRecord/SoloRecord";

export default function SoloPage() {
  const percentage = 70;
  const data = RoomDataGetMock() ?? {};

  const roomName   = data.roomName   ?? 'Room';
  const goalName   = data.goalName   ?? 'Goal';
  const goalNumber = data.goalNumber ?? 0;
  const goalUnit   = data.goalUnit   ?? '';

  return (
    <div className="bg-[#144794] w-full min-h-screen flex justify-center" data-model-id="33:148">
      <div className="bg-[#144794] w-full max-w-[393px] min-h-[852px] relative">
        <SoloRecord goalNumber={goalNumber} goalUnit={goalUnit}/>
        <MovingCircle percentage={percentage}/>
        <TopBoard
          className="!absolute !left-1/2 !transform !-translate-x-1/2 !top-4"
          roomName={roomName}
          goalName={goalName}
          goalNumber={goalNumber}
          goalUnit={goalUnit}
        />
      </div>
    </div>
  );
}