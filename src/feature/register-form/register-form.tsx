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
            alert("登録成功！")
        } catch (err) {
            alert("登録失敗です、もう一度やり直してください")
        }
    };

    return (
        <div className="register-page" style={{ maxWidth: 400, margin: '0 auto', padding: 24 }}>
            <form onSubmit={handleSubmit}>
                    <input
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                        required
                        autoComplete="username"
                        placeholder="ユーザーID"
                        className="login-input w-full"
                        />
                    <input 
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                        placeholder="パスワード"
                        className="login-input w-full mt-5" 
                    />
                <button type="submit" className="primary-btn w-full mt-5">登録</button>
            </form>
        </div>
    );
};

export default RegisterForm;