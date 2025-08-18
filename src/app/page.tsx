import LoginButton from "@/feature/login/loginbutton";
import RegisterButton from "@/feature/register/registerbutton";
import Image from "next/image"

function Home() {
  return (
    <div className =" flex justify-center items-center h-screen">
      <div className="border rounded-lg w-96 text-center">
        <div className="border-b-3 border-b-gray-500">
          <Image
            src="/2530064.png"
            width={80}
            height={80}
            alt="fake icon"
            className="mx-auto pb-3 border-b-4 border-b-white-500" 
          />
        </div>
        <div className="mt-2">
          <LoginButton />
          <RegisterButton />
        </div>
      </div>
    </div>
  );
}

export default Home;