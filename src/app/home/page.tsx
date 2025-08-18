'use client';

import Header from '@/feature/header/Header';
import ProfileCard from '@/feature/profile/ProfileCard';
import StartButtons from '@/feature/startbuttons/StartButtons';
import { useUserSummaryMock } from '@/feature/hooks/useUserSummary.mock';

export default function HomePage() {
  const { data } = useUserSummaryMock();

  const handleSolo = () => {
    console.log('一人で始める clicked');
  };

  const handleTeam = () => {
    console.log('みんなで始める clicked');
  };

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