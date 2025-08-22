import LoginForm from "@/feature/Login/LoginForm";
import Image from "next/image"


export default function LoginPage() {
  return (
    <div className="container">
        <div className="mt-37 flex flex-col items-center">
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
  );
}