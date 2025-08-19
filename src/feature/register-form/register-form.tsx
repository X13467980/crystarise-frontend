'use client';

import React, { useState } from 'react';


const RegisterForm: React.FC = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // TODO: Replace with your registration API call
        try {
            // Example: await api.register(form);
            setSuccess(true);
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-page" style={{ maxWidth: 400, margin: '0 auto', padding: 24 }}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username
                    <input
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                        required
                        autoComplete="username"
                    />
                </label>
                <br />
                <label>
                    Email
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                    />
                </label>
                <br />
                <label>
                    Password
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />
                </label>
                <br />
                <button type="submit">Register</button>
                {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
                {success && <div style={{ color: 'green', marginTop: 8 }}>Registration successful!</div>}
            </form>
        </div>
    );
};

export default RegisterForm;