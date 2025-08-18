import Image from 'next/image';

export default function Header() {
  return (
    <header
      className="px-6 py-4 flex items-center justify-center text-white"
      style={{ backgroundColor: "#144895" }}
    >
      <div className="relative w-40 md:w-60 lg:w-80 h-12 md:h-16 lg:h-20">
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