'use client'
import { useRouter } from "next/navigation"


export default function StartTeamBtn () {
    const Router = useRouter()

    return (
            <div className="w-full flex justify-center">
                <div className="">
                    <button className="primary-btn min-w-70" onClick={Router.push("/team")}>開始する</button>
                </div>
            </div>
    )
}