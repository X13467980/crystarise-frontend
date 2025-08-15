"use client";
import React, { useState  } from "react";

const LoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
    console.log("ログインしました");
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    console.log("ログアウトしました");
  };

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={handleLogoutClick}>ログアウト</button>
      ) : (
        <button onClick={handleLoginClick}>ログイン</button>
      )}
    </div>
  );
};

export default LoginButton;