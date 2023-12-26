import Link from "next/link";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex flex-row gap-4">
        <Link href="/dashboard/showcase">showcase</Link>
        <Link href="/dashboard/device">device </Link>
      </div>
      <main>{children}</main>
    </div>
  );
}
