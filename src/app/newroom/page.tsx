'use client';

import Header from '@/feature/Header/Header';
import ProfileCard from '@/feature/Profile/ProfileCard';
import GoLoginButton from '@/feature/GoLogin/GoLoginButton';
import StartButtons from '@/feature/StartButtons/StartButtons';
import { useUserSummary } from '@/feature/hooks/useUserSummary';
import LogoutButton from '@/feature/Logout/LogoutButton';
import NewRoomInput from '@/feature/NewRoomInput/NewRoomInput';

import React, { useState } from 'react';
import NewRoomGoal from '@/feature/NewRoomGoal/NewRoomGoal';
import NewRoomButton from '@/feature/NewRoomButton/NewRoomButton';

export default function NewRoomPage() {
    const [roomName, setRoomName] = useState('');
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
                        <NewRoomInput
                            value={roomName}
                            onChange={setRoomName}
                        />
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
                    <NewRoomButton />
                </main>
            </div>
        </>
    )
}