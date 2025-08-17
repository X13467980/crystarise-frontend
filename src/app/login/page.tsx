'use client';

import React, { useState } from 'react';

const LoginPage: React.FC = () => {
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
        <div style={{ maxWidth: 400, margin: '80px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Username
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                            autoComplete="username"
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                            autoComplete="current-password"
                        />
                    </label>
                </div>
                {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
                <button type="submit" style={{ width: '100%', padding: 10 }}>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;