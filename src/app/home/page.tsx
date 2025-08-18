'use client';

import React from 'react';
import Header from "@/feature/header/Header";
import ProfileCard from '@/feature/profile/ProfileCard';

export default function HomePage() {
  return (
    <div
      className="flex flex-col min-h-screen text-white"
      style={{ backgroundColor: "#144895" }}
    >
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <ProfileCard
          displayName="Example Name"
          avatarUrl="/vercel.svg"
          soloCount={5}
          teamCount={10}
          badgeCount={3}
        />
      </main>
    </div>
  );
}