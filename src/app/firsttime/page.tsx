"use client"
import Header from "@/feature/header/Header"
import ProfileCard from '@/feature/profile/ProfileCard';
import { useUserSummary } from '@/feature/hooks/useUserSummary';
import CrystalText from "@/feature/crystalgrowtext/crystalgrowtext";
import LogoutButton from '@/feature/logout/LogoutButton';

export default function FirstTimePage () {
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
    return(
        <div className="min-h-screen text-white relative" style={{ backgroundColor: '#144895' }}>
            <Header />
            <main className="flex flex-col items-center justify-center px-6 py-16">
            <p className="opacity-90">ログインしてください</p>
            </main>
        </div>
    );
}

return (
    <div className="min-h-screen text-white relative" style={{ backgroundColor: '#144895' }}>
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
            <CrystalText />
        </main>
    </div>
)
};