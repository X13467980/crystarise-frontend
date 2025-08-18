'use client';

export type Summary = {
  displayName: string;
  avatarUrl: string | null;
  soloCount: number;
  teamCount: number;
  badgeCount: number;
};

export function useUserSummaryMock() {
  const data: Summary = {
    displayName: 'Example Name',
    avatarUrl: '/mock-icon.png',
    soloCount: 12,
    teamCount: 5,
    badgeCount: 17,
  };
  return { data, loading: false, error: null as string | null };
}