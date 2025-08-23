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
      <Header />
      <div className="m-auto px-12 max-w-100 flex flex-col min-h-screen" style={{ backgroundColor: '#144895' }}>
        <main>
          <div className="w-full flex flex-col items-center space-y-4 pt-48 pb-10">
            <p className="text-[var(--secondary)]">ルーム名を入力する</p>
            <NewRoomInput value={roomName} onChange={setRoomName} />
          </div>

          <div className="w-full flex flex-col items-center space-y-4 pb-48">
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

          {/* 入力値をAPI実行ボタンに渡す */}
          <div className="w-full flex flex-col items-center pb-20">
            <NewRoomButton
              name={roomName}   // 追加したrooms.name
              title={goal}
              targetValue={Number(number) || 0}  // 数値に変換（未入力は0）
              unit={unit}
            />
          </div>
        </main>
      </div>
    </>
  );
}