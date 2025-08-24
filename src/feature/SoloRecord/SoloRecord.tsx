'use client';

import { useState } from "react";
import { useAuth } from "@/feature/hooks/useAuth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

type Props = {
  roomId: number;                 // ★ どのルームか（＝ by-room の :room_id ）
  goalNumber?: number;
  goalUnit?: string;
  onSubmitted?: (percent: number) => void; // ★ 進捗％を親へ
};

export default function SoloRecord({ roomId, goalNumber, goalUnit, onSubmitted }: Props) {
  const [value, setValue] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth(); // ★ JWT

  const extractError = async (r: Response) => {
    try {
      const data = await r.clone().json();
      return (data as any)?.detail ?? (data as any)?.error ?? (data as any)?.message ?? JSON.stringify(data);
    } catch {
      return await r.text();
    }
  };

  const submit = async () => {
    const v = Number(value);
    if (value === "" || Number.isNaN(v)) return;
    if (!token) {
      alert("サインインが必要です");
      return;
    }

    setLoading(true);
    try {
      // ★ ここを crystal_id エンドポイントから「by-room」に変更
      const res = await fetch(`${API_BASE}/crystals/by-room/${roomId}/records`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "accept": "application/json",
        },
        body: JSON.stringify({ value: v, note: note || undefined }),
      });

      if (!res.ok) {
        const msg = await extractError(res);
        throw new Error(msg);
      }

      // バックエンドは { record, summary } を返す想定
      const data = await res.json();
      // 互換: 数値だけ返ってきた場合にも対応
      let percent = 0;
      if (typeof data === "number") {
        percent = Math.max(0, Math.min(100, Math.round(data)));
      } else if (data?.summary?.progress_rate != null) {
        const rate = Number(data.summary.progress_rate);
        percent = Math.max(0, Math.min(100, Math.round(rate * 100)));
      }

      onSubmitted?.(percent);
      setValue("");
      setNote("");
    } catch (e: any) {
      console.error(e);
      alert(`記録に失敗: ${e?.message ?? e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute w-[260px] h-[290px] top-[529px] left-1/2 transform -translate-x-1/2 bg-[#e9fcff] rounded-[25px] border border-solid border-[#1be8ff] p-3">
      <div className="w-full text-center text-[#144794] text-base mb-2">努力の記録を入力しよう</div>

      <div className="flex items-center gap-3 mb-2">
        <input
          className="w-[120px] h-12 bg-white rounded-[10px] border border-solid border-[#f45c5c] px-3 text-right"
          type="number"
          inputMode="decimal"
          step="any"
          placeholder="0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } }}
          disabled={loading}
        />
        <div className="text-[#144794] text-xl font-mkpop">
          {(goalNumber ?? 0)}{goalUnit ?? ""}
        </div>
      </div>

      <input
        className="w-full h-10 bg-white rounded-[10px] border border-solid border-[#c8eaf0] px-3 mb-3"
        placeholder="メモ（任意）"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        disabled={loading}
      />

      <button
        className="w-full h-10 bg-[#1be8ff] rounded-[10px] active:scale-95 active:shadow-inner hover:bg-blue-500 disabled:opacity-60"
        onClick={submit}
        disabled={loading}
      >
        <span className="text-xs text-center font-inter text-[#144794]">
          {loading ? "送信中..." : "記録する"}
        </span>
      </button>
    </div>
  );
}