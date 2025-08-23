"use client";
import React from "react";
import { useRouter } from "next/navigation";

const GoLoginButton: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <button onClick={handleLoginClick} className="primary-btn w-full">ログイン</button>
  );
};

export default GoLoginButton;