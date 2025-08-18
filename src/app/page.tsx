import LoginButton from "@/feature/gologin/gologinbutton";
import RegisterButton from "@/feature/goregister/goregisterbutton";
import Image from "next/image"

function Home() {
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
      <div className="text-center mt-10" >
        <LoginButton />
        <RegisterButton />
      </div>
    </div>
  </div>
  );
}

export default Home;