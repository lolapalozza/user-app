'use client'

import Link from "next/link";
import QRCode from "react-qr-code";

export default function Balance() {

  const balance = 0
  const address = "TRDGtt4EL9cvGkRqCpnNoqNiQHojVdPHM2"

  return (
    <main className="flex min-h-screen flex-col items-center p-24 relative">

      <div className="absolute left-0 ml-20">
        <span>
          <Link href="/">Back Home</Link>
        </span>
      </div>

      <h1 className="mb-40">
        Balance
      </h1>

      <h2 className="mb-10">Your current Balance is {balance} USD</h2>

      <p>Deposit with USDT (TRC-20)</p>
      <p className="mb-20">Your balance will be updated automatically</p>

      {address}
      <QRCode value={address} />

    </main>
  );
}
