'use client';

export type Summary = {
  displayName: string;
  avatarUrl: string | null;
  soloCount: number;
  teamCount: number;
  badgeCount: number;
};

export function useUserSummaryMock() {
  // 読み込み演出を入れたい場合は setTimeout などを追加してもOK
  const data: Summary = {
    displayName: 'ようた',
    avatarUrl: '/avatar-placeholder.png', // public配下に置く（なければ null でもOK）
    soloCount: 12,
    teamCount: 5,
    badgeCount: 17,
  };
  return { data, loading: false, error: null as string | null };
}