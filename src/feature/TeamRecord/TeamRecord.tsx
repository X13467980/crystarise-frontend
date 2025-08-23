'use client';

import { useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

type Props = {
  goalNumber?: number; 
  goalUnit?: string;   
};

export default function TeamRecord({ goalNumber, goalUnit }: Props) {
  const [value, setValue] = useState("");

  const submit = async () => {
    if (value === "" || Number.isNaN(Number(value))) return; 
    await fetch(`${API_BASE}/record`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(value) }), 
    });
  };

  return (
    <div className="absolute w-[260px] h-[250px] top-[529px] left-1/2 transform -translate-x-1/2 bg-[#e9fcff] rounded-[25px] border border-solid border-[#1be8ff]">
      <input
        className="absolute w-[100px] h-20 top-[75px] left-9 bg-[#fffefe] rounded-[10px] border border-solid border-[#f45c5c] px-3 text-right"
        type="number"
        inputMode="decimal"
        step="any"
        placeholder="0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            submit();
          }
        }}
      />

      <div className="absolute w-[88px] h-[60px] top-[97px] left-[141px]">
        <div className="absolute w-20 h-[60px] top-0 left-4 font-mkpop text-[#144794] text-2xl text-center">
          {(goalNumber ?? 0)}{goalUnit ?? ""}
        </div>
      </div>

      <div className="w-[255px] h-5 top-[29px] left-px absolute text-base text-center text-[#144794]">
        努力の記録を入力しよう
      </div>

      <button
        className="absolute w-[195px] h-10 top-[185px] left-[33px] bg-[#1be8ff] rounded-[10px] active:scale-95 active:shadow-inner hover:bg-blue-500"
        onClick={submit}
      >
        <div className="w-[104px] h-[15px] top-[11px] left-[47px] absolute text-xs text-center font-inter text-[#144794]">
          記録する
        </div>
      </button>
    </div>
  );
}