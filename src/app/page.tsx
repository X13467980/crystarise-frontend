import LoginButton from "@/feature/login/loginbutton";
import RegisterButton from "@/feature/register/registerbutton";

function Home() {
  return (
    <div className ="border flex justify-center items-center h-screen">
      <div className="border w-96 text-center">
      {/* ここにアイコンかな？ */}
      <LoginButton />
      <RegisterButton />
      </div>
    </div>
  );
}

export default Home;