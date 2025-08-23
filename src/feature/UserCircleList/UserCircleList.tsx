"use client";
import Image from "next/image";

export type User = {
  id: string;
  username: string;
  avatarUrl?: string | null;
};

type Props = {
  users: User[];
  className?: string;
};

export default function UserCircleList({ users, className = "" }: Props) {
  return (
    <div className={`mt-3 flex flex-wrap gap-6 ${className}`}>
      {users.map((u) => (
        <div key={u.id} className="flex flex-col items-center w-20">
          <div className="relative w-20 h-20">
            <Image
              src={u.avatarUrl || "/Usericon.svg"} // 👈 fallback
              alt={u.username}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <p className="mt-2 text-sm text-center text-white truncate w-full">
            {u.username}
          </p>
        </div>
      ))}
    </div>
  );
}
