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
        <button onClick={handleLogoutClick} className="primary-btn ">ログアウト</button>
      ) : (
        <button onClick={handleLoginClick} className="primary-btn">ログイン</button>
      )}
    </div>
  );
};

export default LoginButton;