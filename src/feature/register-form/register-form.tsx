'use client';

import React, { useState } from 'react';
import { useRouter } from "next/navigation";


const RegisterForm: React.FC = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Replace with your registration API call
        try {
            // Example: await api.register(form);
            alert("登録成功！")
        } catch (err) {
            alert("登録失敗です、もう一度やり直してください")
        }
    };

    const goBack = () => {
        router.push("/")
    }

    return (
        <div className="mt-10 w-full max-w-md">
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        name="email"
                        type="text"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        placeholder="メールアドレス"
                        className="login-input w-full"
                        />
                </div>
                <div className="mt-5">
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                        placeholder="パスワード"
                        className="login-input w-full " 
                    />
                </div>
                <button type="submit" className="primary-btn w-full mt-5">新規登録</button>
            </form>
            <button className="primary-btn w-full mt-5" onClick={goBack}>戻る</button>
        </div>
    );
};

export default RegisterForm;