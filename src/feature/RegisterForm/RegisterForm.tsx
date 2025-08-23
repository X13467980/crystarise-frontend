'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

type FormState = { email: string; password: string };

type SignUpResponse = {
  message?: string;
  detail?: string;
};

const RegisterForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // name は "email" | "password" の想定なので型を保ったまま更新
    setForm(prev => ({ ...prev, [name]: value } as FormState));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrMsg(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      // FastAPI 側は {message} or {detail} を返す想定
      const data = (await res.json()) as SignUpResponse;

      if (!res.ok) {
        throw new Error(
          typeof data?.detail === 'string'
            ? data.detail
            : '登録に失敗しました。入力内容をご確認ください。'
        );
      }

      alert(data?.message ?? '登録に成功しました。確認メールをチェックしてください。');
      router.push('/home');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => router.push('/');

  return (
    <div className="mt-10 w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            placeholder="メールアドレス"
            className="login-input w-full"
          />
        </div>
        <div className="mt-5">
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="パスワード（6文字以上推奨）"
            className="login-input w-full"
          />
        </div>

        {errMsg && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {errMsg}
          </p>
        )}

        <button
          type="submit"
          className="primary-btn w-full mt-5 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? '登録中…' : '新規登録'}
        </button>
      </form>

      <button className="primary-btn w-full mt-5" onClick={goBack} disabled={loading}>
        戻る
      </button>
    </div>
  );
};

export default RegisterForm;