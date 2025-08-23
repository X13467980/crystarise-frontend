'use client';

import Header from '@/feature/Header/Header';
import NewRoomInput from '@/feature/NewRoomInput/NewRoomInput';
import NewRoomGoal from '@/feature/NewRoomGoal/NewRoomGoal';
import NewRoomButton from '@/feature/NewRoomButton/NewRoomButton';
import React, { useState } from 'react';

type RoomType = 'solo' | 'group';

interface NewRoomFormProps {
  roomType: RoomType; // 'solo' or 'group'
}

export default function NewRoomForm({ roomType }: NewRoomFormProps) {
  const [roomName, setRoomName] = useState('');
  const [goal, setGoal] = useState('');
  const [number, setNumber] = useState('');
  const [unit, setUnit] = useState('');

  return (
    <>
      <div className='absolute inset-0' style={{ height: 'fit-content' }}>
        <Header />
      </div>
      <div className="m-auto px-12 max-w-100 flex flex-col min-h-screen h-[100dvh]" style={{ backgroundColor: '#144895' }}>
        <main className='h-full flex flex-col justify-between pb-10'>
          <div className='h-full flex flex-col justify-center'>
            <div className="w-full flex flex-col items-center space-y-4 pb-10">
              <p className="text-[var(--secondary)]">ルーム名を入力する</p>
              <NewRoomInput
                value={roomName}
                onChange={setRoomName}
              />
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
          <NewRoomButton
            roomType={roomType}                 // ★ ここで種別を渡す
            name={roomName}
            title={goal}
            targetValue={Number(number) || 0}
            unit={unit}
          />
        </main>
      </div>
    </>
  );
}