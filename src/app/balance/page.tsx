'use client'

import {getBalance} from "@/app/balance/api";
import {useEffect, useState} from "react";
import {DepositTRC20} from "@/app/balance/depositTRC20";
import {DepositBlik} from "@/app/balance/depositBlik";
import {BackButton, showBackButton} from "@/shared/BackButton";

const DEPOSIT_TYPE = {
  "BLIK": "blik",
  "TRC-20": "trc-20"
}

export default function Balance() {

  const [depositType, setDepositType] = useState(null)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    getBalance().then((_balance) => {
      setBalance(_balance.balance)
    })
  }, [])

  const depositCallback = () => {
    getBalance().then((_balance) => {
      setBalance(_balance.balance)
    })
    setDepositType(null)
  }

  return (
    <main className="flex min-h-screen mt-10 flex-col items-center relative">

      <BackButton />

      <h1 className="mb-20">
        Balance
      </h1>

      <h2 className="mb-10">Your current Balance is <span className="text-5xl">{balance}</span> PLN</h2>

      <h3 className="mb-4">Fill up your balance with:</h3>

      <ul className="flex gap-2 mb-10">
        <li>
          <button onClick={() => setDepositType(DEPOSIT_TYPE["TRC-20"])} className="border-2 border-white rounded p-2">USDT TRC-20</button>
        </li>
        <li>
          <button onClick={() => setDepositType(DEPOSIT_TYPE.BLIK)} className="border-2 border-white rounded p-2">BLIK</button>
        </li>
      </ul>

      {depositType === DEPOSIT_TYPE["TRC-20"] && <DepositTRC20 depositCallback={depositCallback} />}

      {depositType === DEPOSIT_TYPE["BLIK"] && <DepositBlik />}

    </main>
  );
}
