'use client';

import Header from '@/feature/header/Header';
import ProfileCard from '@/feature/profile/ProfileCard';
import { useUserSummaryMock } from '@/feature/hooks/useUserSummary.mock';

export default function HomePage() {
  const { data } = useUserSummaryMock();

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#144895' }}>
      <Header />
      <main className="px-6 pt-6">
        <ProfileCard
          displayName={data.displayName}
          avatarUrl={data.avatarUrl}
          soloCount={data.soloCount}
          teamCount={data.teamCount}
          badgeCount={data.badgeCount}
        />
      </main>
    </div>
  );
}