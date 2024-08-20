'use client'

import {getBalance, getPaymentInfo, getPaymentJob} from "@/app/balance/api";
import {useEffect, useState} from "react";
import {DepositTRC20} from "@/app/balance/depositTRC20";
import {DepositBlik} from "@/app/balance/depositBlik";
import {BackButton} from "@/shared/BackButton";
import {DepositTon} from "@/app/balance/depositTon";
import {TonConnectUIProvider} from "@tonconnect/ui-react";
import classNames from "classnames";
import Link from "next/link";
import {Loading} from "@/shared/Loading";

const DEPOSIT_TYPE = {
  "BLIK": "blik",
  "TRC-20": "trc-20",
  "TON": "ton"
}

export default function Balance() {

  const [depositType, setDepositType] = useState(null)
  const [balance, setBalance] = useState(0)
  const [balanceLoading, setBalanceLoading] = useState(false)
  const [paymentInfo, setPaymentInfo] = useState({})

  const usdtButtonClasses = classNames("border-2", "border-white", "rounded", "p-2", {
    "bg-red-400": depositType === DEPOSIT_TYPE["TRC-20"]
  })

  const blikButtonClasses = classNames("border-2", "border-white", "rounded", "p-2", {
    "bg-red-400": depositType === DEPOSIT_TYPE["BLIK"]
  })

  const tonButtonClasses = classNames("border-2", "border-white", "rounded", "p-2", {
    "bg-red-400": depositType === DEPOSIT_TYPE["TON"]
  })

  const fetchBalance = () => {
    setBalanceLoading(true)
    getBalance().then((_balance) => {
      setBalance(_balance.balance)
      setBalanceLoading(false)
      setDepositType(null)
    })
  }

  useEffect(fetchBalance, [])

  useEffect(() => {
    getPaymentInfo().then((data) => {
      setPaymentInfo(data)
    })
  }, [])

  return (
    <main className="flex min-h-screen mt-10 flex-col items-center relative">

      <BackButton />

      <h1 className="mb-10">
        Баланс
      </h1>

      {
        balanceLoading ? <div className="mb-5"><Loading /></div> :
          <h2 className="mb-5"><span className="text-5xl">{balance.toFixed(2)}</span> PLN</h2>
      }

      <Link href="/balance/history">
        <button className="border-2 rounded p-1 mb-5 text-white text-xs">
        История Транзакций
        </button>
      </Link>


      <h3 className="mb-4">Выберите способ оплаты</h3>

      <ul className="flex gap-2 mb-10">
        <li>
          <button onClick={() => setDepositType(DEPOSIT_TYPE["TRC-20"])}
                  className={usdtButtonClasses}>USDT TRC-20
          </button>
        </li>
        <li>
          <button onClick={() => setDepositType(DEPOSIT_TYPE.BLIK)}
                  className={blikButtonClasses}>BLIK
          </button>
        </li>
        <li>
          <button onClick={() => setDepositType(DEPOSIT_TYPE.TON)}
                  className={tonButtonClasses}>TON
          </button>
        </li>
      </ul>

      {depositType === DEPOSIT_TYPE["TRC-20"] && <DepositTRC20 walletAddress={paymentInfo?.usdtWallet} onSuccess={fetchBalance}/>}

      {depositType === DEPOSIT_TYPE["BLIK"] && <DepositBlik walletAddress={paymentInfo?.blikWallet} />}

      {depositType === DEPOSIT_TYPE["TON"] && (
        <TonConnectUIProvider manifestUrl="https://user-app-x.vercel.app/tonconnect-manifest.json">
          <DepositTon onSuccess={fetchBalance} walletAddress={paymentInfo?.tonWallet} />
        </TonConnectUIProvider>
      )}

    </main>
  );
}
