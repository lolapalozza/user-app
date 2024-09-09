import QRCode from "react-qr-code";
import {createPaymentJob, getPaymentJob} from "@/app/balance/api";
import {useEffect, useState} from "react";
import {formatDate} from "@/app/orders/formatDate";
import {Loading} from "@/shared/Loading";
import {ClickToCopy} from "@/shared/ClickToCopy";
import {MainButton} from "@/shared/MainButton";
import Image from "next/image";
import {BackButton} from "@/shared/BackButton";

export const DepositTRC20 = ({onSuccess, walletAddress, balance}) => {

  const [amount, setAmount] = useState(0)
  const [payment, setPayment] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const [isEditing, setIsEditing] = useState(false)

  const fetchPaymentJob = () => {
    getPaymentJob("usdt").then((job) => {
      if(job && job.jobId) {
        setPayment({
          amount: job.cryptoAmount,
          expires: job.expiresAt
        })
        setAmount(job.plnAmount)
      }
    }).catch((e) => {
      setPayment({})
      setAmount(0)
    })
  }

  useEffect(() => {
    fetchPaymentJob()
    const interval = setInterval(() => {
      if(!isEditing){
        fetchPaymentJob()
      }
    }, 15000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const createPayment = () => {

    if(amount < 5){
      setMessage("Amount should be more than 5 PLN")
      return setTimeout(() => {
        setMessage("")
      }, 4000)
    }

    //if USDT job exists
    // if(job.jobId){
    //   window.Telegram.WebApp.showAlert('You\'re gonna create a new payment');
    // }

    setIsLoading(true)
    createPaymentJob({amountPLN: amount, currency: "usdt"}).then((data) => {
      setPayment({
        amount: data.amountUsdt,
        expires: data.expiresAt
      })
      setIsLoading(false)
      setIsEditing(false)
    }).catch((e) => {
      setIsLoading(false)
    })
  }

  return <div className="text-center w-full">

    {
      isEditing && <BackButton onClick={() => setIsEditing(false)} />
    }

    {
      !payment.amount || isEditing ? <>
        <h3>Введите сумму, чтобы пополнить</h3>
        <span className="text-slate-500 text-sm">Мы создадим реквизиты</span>

        <div className="mt-7">
          <input value={amount}
                 onChange={(e) => setAmount(e.target.value)}
                 type="number"
                 className="bg-transparent text-5xl text-center w-40 outline-none"
                 pattern="^\d*$"
                 autoFocus/>
          PLN
        </div>

        <div className="text-slate-500 text-sm">Мой баланс: {balance} PLN</div>
        <div className="flex flex-col items-center gap-2 justify-center">
          <MainButton onClick={createPayment} className="mt-5 bg-color-3">Создать реквизиты</MainButton>
          {isLoading && <Loading/>}
          {message}
        </div>

      </> : <>
        <div className="mb-7">
          <h3>Реквизиты для пополнения</h3>
          <span className="text-slate-500 text-sm">Действительны до {formatDate(payment.expires)}</span>
          <div className="text-5xl mt-7">
            {amount} PLN
          </div>

          <div className="w-full flex justify-center">
            <button onClick={() => setIsEditing(true)}
                    className="bg-color mt-2 text-color rounded-2xl p-2 pl-5 pr-5 flex gap-2 justify-center items-baseline">
              <Image
                src="/icons/icon-pen.png"
                className="dark:invert inline-block text-color"
                width={16}
                height={16}
              />
              Изменить
            </button>
          </div>
        </div>
        <div className="mt-10 text-center">
          <div className="mb-2">Отправьте точную сумму:</div>
          <ClickToCopy copyData={payment.amount}
                       className="text-5xl mb-7 inline-block pr-5">{payment.amount}</ClickToCopy>
          <div className="mb-2">Адрес:</div>
          <ClickToCopy copyData={walletAddress}
                       className="mb-8 bg-color inline-block pr-5 border-2 border-color rounded-2xl border-dashed p-2 border-white">
            {walletAddress}
          </ClickToCopy>
          <QRCode className="inline-block mb-2" value={walletAddress}/>
          {/*<p className="mb-20 text-sm">средства зачисляются автоматически</p>*/}
        </div>
      </>
    }
  </div>
}
