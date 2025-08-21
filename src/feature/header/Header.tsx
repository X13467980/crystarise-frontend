"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header
      className="relative px-6 py-4 flex items-center justify-between text-white"
      style={{ backgroundColor: "#144895" }}
    >
      <button
        onClick={() => router.push("/home")}
        className="relative w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20"
      >
        <Image
          src="/homebutton.svg"
          alt="home-button"
          fill
          className="object-contain"
        />
      </button>

      <div className="absolute left-1/2 transform -translate-x-1/2 w-48 md:w-64 lg:w-80 h-12 md:h-16 lg:h-20">
        <Image
          src="/logo.svg"
          alt="logo"
          fill
          className="object-contain"
        />
      </div>

      <div className="w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20" />
    </header>
  );
}