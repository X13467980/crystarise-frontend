'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function parseJwt<T = any>(token: string): T | null {
  try {
    const payload = token.split('.')[1];
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch {
    return null;
  }
}

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      // 期限チェック（expは秒単位UNIX時刻）
      const payload = parseJwt<{ exp?: number }>(storedToken);
      const now = Math.floor(Date.now() / 1000);
      if (payload?.exp && payload.exp > now) {
        setToken(storedToken);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('access_token');
      }
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('access_token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  // ★ ネットワークには行かずローカルで有効性を判定（重複リクエスト防止）
  const validateToken = async (): Promise<boolean> => {
    if (!token) return false;
    const payload = parseJwt<{ exp?: number }>(token);
    const now = Math.floor(Date.now() / 1000);
    const ok = !!(payload?.exp && payload.exp > now);
    if (!ok) {
      localStorage.removeItem('access_token');
      setToken(null);
      setIsAuthenticated(false);
    }
    return ok;
  };

  return { token, isAuthenticated, login, logout, validateToken };
}