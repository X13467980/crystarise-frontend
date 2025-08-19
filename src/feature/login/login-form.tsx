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
        <div className="">
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                        autoComplete="username"
                        placeholder="ユーザーID"
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                        autoComplete="current-password"
                        placeholder="パスワード"
                    />
                </div>
                {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
                <button type="submit" style={{ width: '100%', padding: 10 }}>ログイン</button>
            </form>
        </div>
    );
};

export default LoginForm;