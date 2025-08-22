'use client';

import Header from '@/feature/Header/Header';
import ProfileCard from '@/feature/Profile/ProfileCard';
import GoLoginButton from '@/feature/GoLogin/GoLoginButton';
import StartButtons from '@/feature/StartButtons/StartButtons';
import { useUserSummary } from '@/feature/hooks/useUserSummary';
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
          <StartButtons />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative" style={{ backgroundColor: '#144895' }}>
      <Header />
      <div className="flex justify-center">
        <main className="flex flex-col flex-1 items-center justify-center max-w-98 gap-8">
        <ProfileCard
          displayName={data.displayName}
          avatarUrl={data.avatarUrl}
          soloCount={data.soloCount}
          teamCount={data.teamCount}
          badgeCount={data.badgeCount}
          className="w-full max-w-md md:max-w-lg"
        />
        <CrystalText
        className="mt-18"
        />
        <StartButtons />
      </main>
      </div>
      {data && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
          <LogoutButton className="px-3 py-2 text-sm whitespace-nowrap" />
        </div>
      )}
    </div>
  );
}