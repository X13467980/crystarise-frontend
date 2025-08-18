'use client';

import Header from '@/feature/header/Header';
import ProfileCard from '@/feature/profile/ProfileCard';
import GoLoginButton from '@/feature/gologin/gologinbutton';
import StartButtons from '@/feature/startbuttons/StartButtons';
import { useUserSummary } from '@/feature/hooks/useUserSummary';

export default function HomePage() {
  const { data, loading, error } = useUserSummary();

  const handleSolo = () => {
    console.log('一人で始める clicked');
  };

  const handleTeam = () => {
    console.log('みんなで始める clicked');
  };

  if (loading) {
    return (
      <div className="min-h-screen text-white" style={{ backgroundColor: '#144895' }}>
        <Header />
        <main className="flex flex-col items-center justify-center px-6 py-16">
          <p className="opacity-80">Loading...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-white" style={{ backgroundColor: '#144895' }}>
        <Header />
        <main className="flex flex-col items-center justify-center px-6 py-16">
          <p className="text-red-300">Error: {error}</p>
        </main>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen text-white" style={{ backgroundColor: '#144895' }}>
        <Header />
        <main className="flex flex-col items-center justify-center px-6 py-16">
          <p className="opacity-90">ログインしてください</p>
          <GoLoginButton />
          <StartButtons onSoloClick={handleSolo} onTeamClick={handleTeam} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#144895' }}>
      <Header />
      <main className="flex flex-col flex-1 items-center justify-center px-6 py-8 gap-8">
        <ProfileCard
          displayName={data.displayName}
          avatarUrl={data.avatarUrl}
          soloCount={data.soloCount}
          teamCount={data.teamCount}
          badgeCount={data.badgeCount}
          className="w-full max-w-md md:max-w-lg"
        />
        <StartButtons onSoloClick={handleSolo} onTeamClick={handleTeam} />
      </main>
    </div>
  );
}