import Header from "@/feature/Header/Header"
import Image from "next/image"
import Link from "next/link"


export default function Done100Page() {
    return (
        <div className="">
            <Header />
            <div className="w-full min-h-screen flex justify-center mt-50">
                <div className="w-72 h-105 flex flex-col justify-center items-center gap-5">
                    <p className="font-mkpop text-2xl">バッチを獲得ました！</p>
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
                        href="/home"
                        className="primary-btn mt-25 text-center"
                    >
                        ホームに戻る
                    </Link>
                </div>
            </div>
        </div>

    )
}