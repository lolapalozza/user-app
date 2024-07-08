'use client'

import Link from "next/link";

export default function Balance() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">

      <div className="absolute left-0 ml-20">
        <span>
          <Link href="/">Back Home</Link>
        </span>
      </div>

      <h1 className="mb-40">
        Balance
      </h1>
    </main>
  );
}
