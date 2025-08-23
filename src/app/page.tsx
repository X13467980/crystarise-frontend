import GoLoginButton from "@/feature/GoLogin/GoLoginButton";
import GoRegisterButton from "@/feature/GoRegister/GoRegisterButton";
import Image from "next/image"

function Home() {
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
      <div className="text-center mt-10" >
        <GoLoginButton />
        <GoRegisterButton />

      </div>
  </div>
  );
}

export default Home;