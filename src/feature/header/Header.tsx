import Image from 'next/image';

export default function Header() {
  return (
    <header className="px-6 py-4 flex items-center justify-center ">
      <div className="flex items-center">
        <Image src="/logo.svg" alt="logo" width={150} height={40} />
      </div>
    </header>
  );
}
