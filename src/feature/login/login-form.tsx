'use client';

import React, { useState } from 'react';
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const Router =useRouter()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Replace with your actual login logic
        if (!email || !password) {
            alert("メールアドレスとパスワードを入力してください。")
            return;
        }
        // Example: call your API here
        // await login(username, password);
        alert(`${email}としてログインしました。`);
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
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="email"
                        placeholder="メールアドレス"
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