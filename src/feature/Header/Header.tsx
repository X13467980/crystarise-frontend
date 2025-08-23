"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header
      className="px-6 py-4 flex items-center justify-between text-white"
      style={{ backgroundColor: "#144895" }}
    >
      <button
        type="button"
        onClick={() => router.push("/home")}
        className="relative w-[52px] h-[70px]"
        aria-label="home"
      >
        <Image src="/Home.svg" alt="homebutton" fill className="object-contain" />
      </button>

      <div className="relative w-64 md:w-80 lg:w-[26rem] h-16 md:h-20 lg:h-24">
        <Image src="/logo.svg" alt="logo" fill className="object-contain" />
      </div>

      <div className="w-[52px] h-[70px]" />
    </header>
  );
}
