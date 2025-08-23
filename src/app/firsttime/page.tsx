'use client';

import Header from '@/feature/Header/Header';
import ProfileCard from '@/feature/Profile/ProfileCard';
import { useUserSummary } from '@/feature/hooks/useUserSummary';
import GoLoginButton from '@/feature/GoLogin/GoLoginButton';
import RoomTypeChooseBtn from '@/feature/RoomTypeChooseBtn/RoomTypeChooseBtn';
import LogoutButton from '@/feature/Logout/LogoutButton';
import CrystalText from '@/feature/CrystalGrowText/CrystalGrowText';

export default function HomePage() {
  const { data, loading, error } = useUserSummary();

  if (loading) {
    return (
      <div className="min-h-screen text-white relative" style={{ backgroundColor: '#144895' }}>
        <Header />
        <main className="flex flex-col items-center justify-center px-6 py-16">
          <p className="opacity-80">Loading...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-white relative" style={{ backgroundColor: '#144895' }}>
        <Header />
        <main className="flex flex-col items-center justify-center px-6 py-16">
          <p className="text-red-300">Error: {error}</p>
        </main>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen text-white relative" style={{ backgroundColor: '#144895' }}>
        <Header />
        <main className="flex flex-col items-center justify-center px-6 py-16">
          <p className="opacity-90">ログインしてください</p>
          <GoLoginButton />
        </main>
      </div>
    );
  }

  return (
    <>
      <div className='absolute inset-0' style={{ height: 'fit-content' }}>
        <Header />
        </div>
        <div className="min-h-screen text-white h-[100dvh]" style={{ backgroundColor: '#144895' }}>
          <div className="h-full flex justify-center ">
            <main className=" h-full flex flex-col justify-between pb-10">
              <ProfileCard
                displayName={data.displayName}
                avatarUrl={data.avatarUrl}
                soloCount={data.soloCount}
                teamCount={data.teamCount}
                badgeCount={data.badgeCount}
                className="w-full max-w-md md:max-w-lg justify-center pt-28"
              />
              <div className='text-center'>
                <CrystalText />
                <RoomTypeChooseBtn className='pt-4' />
              </div>
              <div className="flex items-center space-y-4">
                <LogoutButton/>
              </div>
            </main>
          </div>
        </div>
      </>
    );
}
