import LoginForm from "@/feature/login/LoginForm";
import Image from "next/image"


export default function LoginPage() {
  return (
    <div className="flex justify-center min-h-screen">
        <div>
        <div className="mt-37">
            <Image
                src="/snowflake-icon.svg"
                width={254}
                height={229}
                alt="snowflake-icon"
            />
            <Image
                src="/name-icon.svg"
                width={212}
                height={65}
                className="mx-auto"
                alt="Name-icon"
            />
        </div>
        <div>
            <LoginForm />
        </div>
        </div>
    </div>
  );
}