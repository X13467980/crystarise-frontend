// useAuth.ts
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Base64URL を通常の Base64 に直してからデコード
function base64UrlDecode(b64url: string): string {
  const pad = '='.repeat((4 - (b64url.length % 4)) % 4);
  const b64 = (b64url + pad).replace(/-/g, '+').replace(/_/g, '/');
  // atob は ASCII を返すので、そのまま JSON.parse できる
  return atob(b64);
}

function parseJwt<T = unknown>(token: string): T | null {
  try {
    const payloadPart = token.split('.')[1];
    if (!payloadPart) return null;
    const json = base64UrlDecode(payloadPart);
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

interface JwtPayload {
  exp?: number; // seconds-since-epoch
  [k: string]: unknown;
}

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('access_token');
    if (!stored) return;

    const payload = parseJwt<JwtPayload>(stored);
    const now = Math.floor(Date.now() / 1000);

    if (payload && typeof payload.exp === 'number' && payload.exp > now) {
      setToken(stored);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('access_token');
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

  // ネットワークに行かずローカルで検証
  const validateToken = async (): Promise<boolean> => {
    if (!token) return false;
    const payload = parseJwt<JwtPayload>(token);
    const now = Math.floor(Date.now() / 1000);
    const ok = !!(payload && typeof payload.exp === 'number' && payload.exp > now);
    if (!ok) {
      localStorage.removeItem('access_token');
      setToken(null);
      setIsAuthenticated(false);
    }
    return ok;
  };

  return { token, isAuthenticated, login, logout, validateToken };
}