import Header from "@/feature/Header/Header"
import Image from "next/image"
import Link from "next/link"
import TopBoard from "@/feature/TopBoard/TopBoard"

export default function nextdone100 () {
const roomName   = room?.name ?? 'Room';
const goalName   = room?.crystal?.title ?? 'Goal';
const goalNumber = room?.crystal?.target_value ?? 0;
const goalUnit   = room?.crystal?.unit ?? '';
    return(
        <div className="">
            <Header />
            <div className="w-full min-h-screen flex justify-center mt-50">
                <div className="w-72 h-105 flex flex-col justify-center items-center gap-5">
                    <p className="font-mkpop font-">100% 達成！</p>
                    <Image
                    src="/fullsnowflake.svg"
                    width={287}
                    height={289}
                    alt="snowflake"
                    
                    />
                    <Image
                    src="/information.svg"
                    width={164}
                    height={24}
                    alt="information"
                    />
                    <Link
                        href="/getbadge100"
                        className="primary-btn mt-4 text-center"
                    >       
                    次へ
                    </Link>
                    <TopBoard />
                </div>
            </div>
        </div>
    )
}