'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]   = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください。');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Cookieベースにしたい場合は credentials: 'include' とCORS側 allow_credentials=True をセット
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          typeof data?.detail === 'string'
            ? data.detail
            : 'ログインに失敗しました。入力内容をご確認ください。'
        );
      }

      // トークン保存（例：localStorage）。本番はhttpOnly Cookieを推奨
      if (data?.access_token) {
        localStorage.setItem('access_token', data.access_token);
      }

      // 成功後に遷移（例：トップやダッシュボード）
      router.push('/home');
    } catch (err: any) {
      setError(err?.message ?? 'ログインに失敗しました。時間をおいて再度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => router.push('/');

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="login-input w-full"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="メールアドレス"
          />
        </div>
        <div className="mt-5">
          <input
            className="login-input w-full"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="current-password"
            placeholder="パスワード"
          />
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="primary-btn mt-5 w-full disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'ログイン中…' : 'ログイン'}
        </button>
      </form>

      <button className="primary-btn w-full mt-5" onClick={goBack} disabled={loading}>
        戻る
      </button>
    </div>
  );
};

export default LoginForm;