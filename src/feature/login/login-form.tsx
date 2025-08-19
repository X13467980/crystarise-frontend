'use client';

import React, { useState } from 'react';
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const Router =useRouter()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Replace with your actual login logic
        if (!username || !password) {
            alert("ユーザーIDとパスワードを入力してください。")
            return;
        }
        // Example: call your API here
        // await login(username, password);
        alert(`${username}としてログインしました。`);
    };
    const handleLoginClick = () =>{
        Router.push("/login")
    }

    const goBack = () => {
        Router.push("/")
    }

    return (
        <div className="mt-10">
            <form onSubmit={handleSubmit} >
                <div >
                    <input 
                        className="login-input w-full"
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        autoComplete="username"
                        placeholder="ユーザーID"
                    />
                </div>
                <div className="mt-5">
                    <input
                        className="login-input w-full"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                        placeholder="パスワード"
                    />
                </div>
                <button type="submit" className="primary-btn mt-5 w-full " onClick={handleLoginClick}>ログイン</button>
            </form>
            <button className="primary-btn w-full mt-5" onClick={goBack}>戻る</button>
        </div>
    );
};

export default LoginForm;