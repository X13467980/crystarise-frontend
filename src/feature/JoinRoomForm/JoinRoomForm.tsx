// src/feature/JoinRoomForm/JoinRoomForm.tsx
'use client';

import { useState, useEffect } from 'react';

type Props = {
  onSubmit?: (payload: { roomId: string; password: string }) => Promise<boolean> | boolean;
  defaultRoomId?: string;
  defaultPassword?: string;
  onValidChange?: (isValid: boolean) => void;
  /** 外側ボタンの form 属性で紐付けるための id（任意） */
  formId?: string;
};

export default function JoinRoomForm({
  onSubmit,
  defaultRoomId = '',
  defaultPassword = '',
  onValidChange,
  formId = 'join-form',             // ← 追加
}: Props) {
  const [roomId, setRoomId] = useState(defaultRoomId);
  const [password, setPassword] = useState(defaultPassword);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = roomId.trim().length > 0 && password.trim().length > 0;

  useEffect(() => {
    if (onValidChange) onValidChange(isValid);
  }, [isValid, onValidChange]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const ok = (await onSubmit?.({ roomId: roomId.trim(), password: password.trim() })) ?? true;
      if (ok) {
        setRoomId('');
        setPassword('');
      }
    } catch (err: any) {
      setError(err?.message ?? '参加に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="w-full max-w-[720px] mx-auto">
      <p className="text-center text-base md:text-xl text-[var(--secondary,#CDEBFF)] mb-6 md:mb-8">
        友達と一緒にクリスタルを作ろう
      </p>

      <label className="block mb-4 md:mb-6">
        <span className="sr-only">ルームID</span>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          placeholder="ルームID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full rounded-2xl bg-[#dff7fb]/80 placeholder:text-slate-500 px-5 py-4 md:py-5
                     shadow-[0_2px_0_0_rgba(255,255,255,0.25)_inset,0_1px_8px_rgba(0,0,0,0.08)]
                     focus:outline-none focus:ring-4 focus:ring-cyan-300/40 focus:bg-white
                     text-slate-900 text-base"
        />
      </label>

      <label className="block mb-1">
        <span className="sr-only">Password</span>
        <input
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-2xl bg-[#dff7fb]/80 placeholder:text-slate-500 px-5 py-4 md:py-5
                     shadow-[0_2px_0_0_rgba(255,255,255,0.25)_inset,0_1px_8px_rgba(0,0,0,0.08)]
                     focus:outline-none focus:ring-4 focus:ring-cyan-300/40 focus:bg-white
                     text-slate-900 text-base"
        />
      </label>

      {error && (
        <p className="mt-3 text-sm text-red-100/90 bg-red-500/20 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <button type="submit" className="hidden" />
    </form>
  );
}