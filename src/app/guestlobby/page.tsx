import Header from "@/feature/Header/Header"
import ProfileCard from "@/feature/Profile/ProfileCard"

export default function GuestLobby () {
    return (
        <div>
            <Header />
            <div className="w-full flex justify-center">
                <ProfileCard className="mt-8"/>
            </div>
            <p className="font-inter my-10 text-center text-[#EAFDFF]">ルームを選択してください</p>
            <div className="min-h-screen bg-white rounded-2xl">
                <div className="flex justify-center items-center gap-10 font-inter text-[#144895] text-2xl">
                    <p >ひとりで</p> <p>みんなで</p>
                </div>
            </div>
        </div>
    )
}