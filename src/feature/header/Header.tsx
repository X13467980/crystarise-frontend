import Image from 'next/image';

export default function Header() {
  return (
    <header
      className="px-6 py-4 flex items-center justify-center text-white"
      style={{ backgroundColor: "#144895" }}
    >
      <div className="relative w-64 md:w-80 lg:w-[26rem] h-16 md:h-20 lg:h-24">
        <Image
          src="/logo.svg"
          alt="logo"
          fill
          className="object-contain"
        />
      </div>
    </header>
  );
}