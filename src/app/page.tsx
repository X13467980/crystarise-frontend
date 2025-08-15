import LoginButton from "@/feature/login/loginbutton";
import RegisterButton from "@/feature/register/registerbutton";

function Home() {
  return (
    <div>
      <h2>ログイン</h2>
      <LoginButton />
      <h2>新規登録</h2>
      <RegisterButton />
    </div>
  );
}

export default Home;