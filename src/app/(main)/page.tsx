"use client";
import { signOut } from "next-auth/react";

import Header from "@/components/header/Header";

export default function Home() {
  return (
    <section className="col-span-2 lg:col-span-2 border-x border-slate-6">
      <Header lable="Home" />
      <button onClick={() => signOut()}>signOut</button>
    </section>
  );
}
