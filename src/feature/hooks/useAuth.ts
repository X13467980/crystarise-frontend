'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // 初期化: localStorageからトークンを読み込み
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // ログイン成功時に呼ぶ
  const login = (newToken: string) => {
    localStorage.setItem('access_token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  // ログアウト処理
  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  // サーバーに問い合わせてトークンの有効性を確認する関数（任意）
  const validateToken = async (): Promise<boolean> => {
    if (!token) return false;

    try {
      const res = await fetch(`${API_BASE}/me/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 無効なら削除
      if (!res.ok) {
        localStorage.removeItem('access_token');
        setToken(null);
        setIsAuthenticated(false);
        return false;
      }
      return true;
    } catch (err) {
      localStorage.removeItem('access_token');
      setToken(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  return {
    token,
    isAuthenticated,
    login,
    logout,
    validateToken,
  };
}