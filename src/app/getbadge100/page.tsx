import Header from "@/feature/Header/Header"
import Image from "next/image"
import Link from "next/link"
import RandomBadges from "@/feature/RandomBadges/RandomBadges"          


export default function Done100Page() {
    return (
        <>
            <div>
            <div className="absolute inset-0" style={{ height: 'fit-content' }}>
                <Header />
            </div>
            <div className="m-auto px-12 max-w-100 min-h-screen h-screen flex flex-col items-center" style={{ backgroundColor: '#144895' }}>
                <div className="flex flex-col h-full justify-between items-center pb-10">
                <div className="h-full flex flex-col items-center justify-center space-y-4 pt-28">
                    <p className="font-mkpop text-[var(--secondary)] text-[24px]">バッジを獲得しました！</p>
                    <RandomBadges />
                </div>
                <Link
                    href="/home"
                    className="primary-btn text-center space-y-4"
                >
                    戻る
                </Link>
                </div>
            </div>
            </div>
        </>

    )
}