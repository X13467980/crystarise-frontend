'use client';

import Header from '@/feature/Header/Header';
import NewRoomInput from '@/feature/NewRoomInput/NewRoomInput';
import React, { useState } from 'react';
import NewRoomGoal from '@/feature/NewRoomGoal/NewRoomGoal';
import NewRoomButton from '@/feature/NewRoomButton/NewRoomButton';

export default function NewRoomPage() {
  const [roomName, setRoomName] = useState(''); // 将来 rooms.name を追加したら送る
  const [goal, setGoal] = useState('');
  const [number, setNumber] = useState('');
  const [unit, setUnit] = useState('');


return (
    <>
      <div className="absolute inset-0">
        <Header />
      </div>

      <div
        className="m-auto px-12 max-w-100 flex flex-col min-h-screen h-[100dvh]"
        style={{ backgroundColor: '#144895' }}
      >
        <main className="h-full flex flex-col justify-between pb-10">
          <div className="h-full flex flex-col justify-center">
            <div className="w-full flex flex-col items-center space-y-4 pb-10">
              <p className="text-[var(--secondary)]">ルーム名を入力する</p>
              <NewRoomInput value={roomName} onChange={setRoomName} />
            </div>

            <div className="w-full flex flex-col items-center space-y-4">
              <p className="text-[var(--secondary)]">目標を入力する</p>
              <NewRoomGoal
                goal={goal}
                number={number}
                unit={unit}
                onChangeGoal={setGoal}
                onChangeNumber={setNumber}
                onChangeUnit={setUnit}
              />
            </div>
          </div>

          {/* 入力値をAPI実行ボタンに渡す */}
          <div className="w-full flex flex-col items-center pb-20">
            <NewRoomButton
              name={roomName}                          // rooms.name
              title={goal}                             // crystals.title
              targetValue={Number(number) || 0}        // crystals.target_value
              unit={unit}                              // crystals.unit
            />
          </div>
        </main>
      </div>
    </>
  );
}