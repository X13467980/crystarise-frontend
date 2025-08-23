import Header from "@/feature/Header/Header"
import TopBoard from "@/feature/TopBoard/TopBoard"
import Image from "next/image"
import UserCircleList, { User } from "@/feature/UserCircleList/UserCircleList";


export default function Lobby () {
const roomName = "asdasdasd"
const roomPw = "asdasd"
const sampleUsers: User[] = [
  { id: "1", username: "矢野陽大" },
  { id: "2", username: "りの", avatarUrl: "/avatars/rino.png" },
  { id: "3", username: "YOTABO" },
  { id: "4", username: "矢野クリスタル YOTABO" },
  { id: "5", username: "飛島JP" },
  { id: "6", username: "RINO" },
  { id: "7", username: "YANOさん" },
  { id: "8", username: "ここ" },
  { id: "9", username: "Ksan" },
  { id: "10", username: "飛島Japan" },
];


    return (

        <div>
            <Header />
            <div className="flex justify-center">
                <TopBoard />
            </div>
            <p className="text-center mt-5 pb-3 border-b border-[#EAFDFF] text-[#EAFDFF]"> ルームID:{roomName}  Password: {roomPw}</p>
            <div className="w-full min-h-screen flex justify-center">
                <UserCircleList users={sampleUsers} />
            </div>
            <div className="w-full flex justify-center">
                <div className="">
                    <button className="primary-btn min-w-70">開始する</button>
                </div>
            </div>
            

        </div>
    )
}