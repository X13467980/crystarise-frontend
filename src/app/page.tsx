import LoginButton from "@/feature/login/loginbutton";
import RegisterButton from "@/feature/register/registerbutton";

function Home() {
  return (
    <div className ="border flex justify-center items-center h-screen">
      <div className="border w-96 text-center">
      <h2 className="mt-30">ログイン</h2>
      <LoginButton />
      <h2>新規登録</h2>
      <RegisterButton />
      </div>
    </div>
  );
}

export default Home;