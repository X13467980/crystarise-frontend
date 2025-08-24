"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function RandomBadges() {
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    // Random number 1–9
    const randomIndex = Math.floor(Math.random() * 9) + 1;
    setPhoto(`/Badges${randomIndex}.svg`);
  }, []);

  if (!photo) return null;
    return (
            <Image
                src={photo}
                width={287}
                height={289}
                alt="snowflake"
            />
    )

