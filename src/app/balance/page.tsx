'use client'

import {getBalance, getPaymentInfo, getPaymentJob, getTransactions} from "@/app/balance/api";
import {useEffect, useState} from "react";
import {DepositTRC20} from "@/app/balance/depositTRC20";
import {DepositBlik} from "@/app/balance/depositBlik";
import {BackButton} from "@/shared/BackButton";
import {DepositTon} from "@/app/balance/depositTon";
import {TonConnectUIProvider} from "@tonconnect/ui-react";
import classNames from "classnames";
import Link from "next/link";
import {Loading} from "@/shared/Loading";
import {useBalance} from "@/app/balance/useBalance";
import Image from "next/image";
import {transactionIcon} from "@/app/balance/transactionIcons";

const DEPOSIT_TYPE = {
  "BLIK": "blik",
  "TRC-20": "trc-20",
  "TON": "ton"
}

export default function Balance() {

  const [depositType, setDepositType] = useState(null)
  const [paymentInfo, setPaymentInfo] = useState({})
  const [balance, balanceLoading] = useBalance()
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    getTransactions({}).then(({transactions}) => {
      setTransactions(transactions)
    })
  }, [])

  const usdtButtonClasses = classNames("w-full", "text-black", "rounded-2xl", "p-2", {
    "bg-red-400": depositType === DEPOSIT_TYPE["TRC-20"]
  })

  const blikButtonClasses = classNames("w-full", "text-black", "rounded-2xl", "p-2", {
    "bg-red-400": depositType === DEPOSIT_TYPE["BLIK"]
  })

  const tonButtonClasses = classNames("w-full", "text-black", "rounded-2xl", "p-2", {
    "bg-red-400": depositType === DEPOSIT_TYPE["TON"]
  })

  useEffect(() => {
    getPaymentInfo().then((data) => {
      setPaymentInfo(data)
    })
  }, [])

  return (
    <main className="flex min-h-screen mt-10 flex-col items-center relative">

      <BackButton/>

      <div className="flex gap-1 items-start">
        <Image
          src="/icons/icon-coins.png"
          className="dark:invert inline-block mb-5"
          width={24}
          height={24}
        /> Мой Баланс
      </div>

      {
        balanceLoading ? <div className="mb-5"><Loading/></div> :
          <h2 className="mb-5"><span className="text-5xl">{balance.toFixed(2)}</span> PLN</h2>
      }

      {/*<Link href="/balance/history">*/}
      {/*  <button className="border-2 rounded p-1 mb-5 text-white text-xs">*/}
      {/*    История Транзакций*/}
      {/*  </button>*/}
      {/*</Link>*/}


      <h3 className="mb-4">Выбери, чтобы пополнить</h3>

      <ul className="flex gap-2 mb-10 w-full">
        <li className="w-4/12">
          <button style={{backgroundColor: "#3DA9DF"}} onClick={() => setDepositType(DEPOSIT_TYPE["TRC-20"])}
                  className={usdtButtonClasses}>USDT
          </button>
        </li>
        <li className="w-4/12">
          <button style={{backgroundColor: "#3DA9DF"}} onClick={() => setDepositType(DEPOSIT_TYPE.BLIK)}
                  className={blikButtonClasses}>BLIK
          </button>
        </li>
        <li className="w-4/12">
          <button style={{backgroundColor: "#3DA9DF"}} onClick={() => setDepositType(DEPOSIT_TYPE.TON)}
                  className={tonButtonClasses}>TON
          </button>
        </li>
      </ul>

      <div className="border-2 border-white w-full rounded-2xl p-3 ml-2 mr-2">
        <div className="flex justify-between">
          <div className="flex gap-2 items-start">
            <Image
              src="/icons/icon-history.png"
              className="dark:invert inline-block mb-5"
              width={20}
              height={20}
            /> История Баланса
          </div>
          <div>
            <Link href="/balance/history">Все ></Link>
          </div>
        </div>
        <div>
          {
            transactions.map(transaction => <div key={transaction.created_at} className="flex items-center justify-between gap-2 p-2">
              <div className="flex gap-2 align-center">
                <div>
                  <Image
                    src={`/icons/${transactionIcon[transaction.transaction_type]}.png`}
                    className="dark:invert"
                    width={20}
                    height={20}
                  />
                </div>

                <div>{transaction.transaction_type}</div>
              </div>
              <div style={{color: transaction.direction === "in" && "#3DDF44"}}>
                {transaction.direction === "out" && "-"}
                {transaction.direction === "in" && "+"}
                {transaction.amount} PLN
              </div>
            </div>)
          }
        </div>
      </div>

      {depositType === DEPOSIT_TYPE["TRC-20"] &&
          <DepositTRC20 walletAddress={paymentInfo?.usdtWallet} onSuccess={fetchBalance}/>}

      {depositType === DEPOSIT_TYPE["BLIK"] && <DepositBlik walletAddress={paymentInfo?.blikWallet}/>}

      {depositType === DEPOSIT_TYPE["TON"] && (
        <TonConnectUIProvider manifestUrl="https://user-app-x.vercel.app/tonconnect-manifest.json">
          <DepositTon onSuccess={fetchBalance} walletAddress={paymentInfo?.tonWallet}/>
        </TonConnectUIProvider>
      )}

    </main>
  );
}
