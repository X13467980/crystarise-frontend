
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


const GoLoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLoginClick = () => {
    setIsLoggedIn(true);

    router.push("/login");
  };
  return (
    <button onClick={handleLoginClick} className="primary-btn w-full">ログイン</button>
  );
};

export default GoLoginButton;
