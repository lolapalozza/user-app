'use client'

import {getPaymentInfo, getTransactions} from "@/app/balance/api";
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
  const [balance, balanceLoading, fetchBalance] = useBalance()
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    getTransactions({}).then(({transactions}) => {
      setTransactions(transactions)
    })
  }, [])

  useEffect(() => {
    getPaymentInfo().then((data) => {
      setPaymentInfo(data)
    })
  }, [])

  const balanceContainerClasses = classNames( "w-full", "flex", "flex-col",  "items-center", "p-4")

  return (
    <main className="flex min-h-screen mt-10 flex-col items-center relative">

      {/*<div className="bg-sky-500"></div>*/}

      <BackButton/>

      {
        depositType === null && <div className={balanceContainerClasses} style={{backgroundImage: "url(/images/balance-page-bg.webp)", backgroundSize: 'cover' }}>
          <div className="w-full text-center">
            <div className="flex gap-2 items-start justify-center">
              <Image
                  src="/icons/icon-coins.png"
                  className="dark:invert inline-block mb-2"
                  width={24}
                  height={24}
              /> Мой Баланс
            </div>
            <div>
              {
                balanceLoading ? <div className="mb-5"><Loading/></div> :
                  <h2 className="mb-5"><span className="text-5xl">{balance.toFixed(2)}</span> PLN</h2>
              }
            </div>
            <h3 className="mb-2 mt-10">Выбери, чтобы пополнить</h3>
            <ul className="flex gap-2 mb-10 p-1 w-full">
              <li className="w-4/12">
                <button onClick={() => setDepositType(DEPOSIT_TYPE["TRC-20"])}
                        className="w-full bg-color-3 rounded-2xl p-2">USDT
                </button>
              </li>
              <li className="w-4/12">
                <button onClick={() => setDepositType(DEPOSIT_TYPE.BLIK)}
                        className="w-full bg-color-3 rounded-2xl p-2">BLIK
                </button>
              </li>
              <li className="w-4/12">
                <button onClick={() => setDepositType(DEPOSIT_TYPE.TON)}
                        className="w-full bg-color-3 rounded-2xl p-2">TON
                </button>
              </li>
            </ul>
          </div>
          <div className="w-full rounded-2xl p-5 bg-color-4">
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
                  <Link href="/balance/history">Все &gt;</Link>
                </div>
              </div>
              <div>
                {
                  transactions.map(transaction => <div key={transaction.created_at}
                                                       className="flex items-center justify-between gap-2 p-2">
                    <div className="flex gap-3 items-center">
                      <div>
                        <Image
                          src={`/icons/${transactionIcon[transaction.transaction_type]}.png`}
                          className="dark:invert"
                          width={36}
                          height={36}
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
        </div>
      }

      <div className="w-full">
        {depositType === DEPOSIT_TYPE["TRC-20"] &&
            <DepositTRC20 balance={balance} walletAddress={paymentInfo?.usdtWallet} onSuccess={fetchBalance}/>}

        {depositType === DEPOSIT_TYPE["BLIK"] && <DepositBlik balance={balance} onSuccess={fetchBalance} walletAddress={paymentInfo?.blikWallet}/>}

        {depositType === DEPOSIT_TYPE["TON"] && (
          <TonConnectUIProvider manifestUrl={`${window.location.hostname}/tonconnect-manifest.json`}>
            <DepositTon onSuccess={fetchBalance} walletAddress={paymentInfo?.tonWallet}/>
          </TonConnectUIProvider>
        )}
      </div>

    </main>
  );
}
