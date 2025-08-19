'use client';

import React, { useState } from 'react';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        // Replace with your actual login logic
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
        // Example: call your API here
        // await login(username, password);
        alert(`Logged in as ${username}`);
    };

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
                {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
                <button type="submit" className="primary-btn mt-5 w-full ">ログイン</button>
            </form>
        </div>
    );
};

export default LoginForm;