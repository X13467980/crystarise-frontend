'use client';

import React from 'react';
import { useAuth } from '@/feature/hooks/useAuth';

type Props = {
  className?: string;
  confirm?: boolean; // クリック時に確認ダイアログを出すか
};

export default function LogoutButton({ className = '', confirm = true }: Props) {
  const { logout } = useAuth();

  const handleClick = async () => {
    if (confirm && !window.confirm('ログアウトしますか？')) return;

    // ここで必要なクライアント側のキャッシュを削除
    try {
      // 1) 認証トークン
      localStorage.removeItem('access_token');

      // 2) 任意: アプリ内で使っている他のキャッシュキーがあれば消す（例）
      // localStorage.removeItem('user_profile_cache');
      // sessionStorage.clear();

      // 3) （SWR を使っている場合）全キャッシュ無効化（任意）
      // import { mutate } from 'swr';
      // await mutate(() => true, undefined, { revalidate: false });

    } finally {
      // useAuth の状態を更新＆/loginへ
      logout();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`primary-btn w-full ${className}`}
      aria-label="ログアウト"
    >
      ログアウト
    </button>
  );
}
