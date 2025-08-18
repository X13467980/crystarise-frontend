
"use client";
import { useRouter } from "next/navigation";

const GoRegisterButton = () => {
    const router = useRouter();

    const handleRegisterClick = () => {
        router.push("/register");
    };

    return (
        <div>
            <button className="primary-btn mt-2" onClick={handleRegisterClick}>新規登録</button>
        </div>
    );
};
export default GoRegisterButton;
