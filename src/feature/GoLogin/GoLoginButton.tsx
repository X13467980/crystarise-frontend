"use client";
import React from "react";
import { useRouter } from "next/navigation";

const GoLoginButton: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div>
      <button onClick={handleLoginClick} className="primary-btn">ログイン</button>
    </div>
  );
};

export default GoLoginButton;