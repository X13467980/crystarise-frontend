'use client';

import React from 'react';
import Header from "@/feature/header/Header";

export default function HomePage() {
  return (
    <div
      className="flex flex-col min-h-screen text-white"
      style={{ backgroundColor: "#144895" }}
    >
      <Header />
    </div>
  );
}