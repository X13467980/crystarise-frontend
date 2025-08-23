
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
    <div>
      {/* {isLoggedIn ? (
        <button onClick={handleLogoutClick} className="primary-btn ">ログアウト</button>
      ) : ( */}
        <button onClick={handleLoginClick} className="primary-btn ">ログイン</button>
      {/* )} */}
    </div>
  );
};

export default GoLoginButton;