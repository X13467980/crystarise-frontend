import RegisterForm from '@/feature/register-form/register-form';
import Image from "next/image"

const RegisterPage = () => {
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
            <RegisterForm />
        </div>
        </div>
    </div>
    )
}
export default RegisterPage;