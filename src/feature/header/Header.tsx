"use client"
import Image from 'next/image';
import { useRouter } from 'next/router';


export default function Header() {
  return (
    <header
      className="px-6 py-4 flex items-center justify-between  text-white"
      style={{ backgroundColor: "#144895" }}
    >
      <button className="relative w-18 md:w-20 lg:w-24 h-18 md:h-20 lg:h-24">
        <Image
          src="homebutton.svg"
          alt="home-button"
          fill
          className="object-contain"
        />
      </button>
      <div className="relative w-64 md:w-80 lg:w-[26rem] h-18 md:h-20 lg:h-24">
        <Image
          src="/logo.svg"
          alt="logo"
          fill
          className="object-contain"
        />
      </div>
      <div></div>
    </header>
  );
}