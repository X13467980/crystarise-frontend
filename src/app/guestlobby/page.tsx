import Header from "@/feature/Header/Header"
import ProfileCard from "@/feature/Profile/ProfileCard"

type Room = {
  id: number;
  name: string;
};

export default function GuestLobby () {
  const rooms: Room[] = [
    { id: 1, name: "マラソン大会ルーム" },
    { id: 2, name: "英語勉強ルーム" },
    { id: 3, name: "ダイエット応援ルーム" },
    { id: 4, name: "ヨガチャレンジ" },
  ];
    return (
        <div>
            <Header />
            <div className="w-full flex justify-center">
                <ProfileCard className="mt-8"/>
            </div>
            <p className="font-inter my-10 text-center text-[#EAFDFF]">ルームを選択してください</p>
            <div className="min-h-screen bg-white rounded-2xl">
                <div className="flex flex-col justify-center items-center gap-10 font-mkpop text-[#144895] text-4xl py-6 ">
                    <p>参加中</p>
                        <div className="h-2 w-full max-w-md bg-[#144895] rounded-full"></div>
                </div>
        <ul className="mt-8 space-y-4 max-w-md mx-auto">
        {rooms.map((room) => (
          <li
            key={room.id}
            className="w-full px-4 py-3 rounded-lg border border-[#144895]/30 text-[#144895] text-xl hover:bg-[#EAFDFF] transition"
          >
            {room.name}
          </li>
        ))}
      </ul>
                </div>
            </div>
        
    )
}