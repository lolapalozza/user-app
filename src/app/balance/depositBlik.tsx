import {Loading} from "@/shared/Loading";
import {useEffect, useState} from "react";
import {createPaymentJob, getPaymentJob} from "@/app/balance/api";
import {formatDate} from "@/app/orders/formatDate";
import {ClickToCopy} from "@/shared/ClickToCopy";
import {BackButton} from "@/shared/BackButton";
import {MainButton} from "@/shared/MainButton";
import Image from "next/image";

export const DepositBlik = ({walletAddress, onSuccess, balance}) => {

  const [amount, setAmount] = useState(0)
  const [payment, setPayment] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const [isEditing, setIsEditing] = useState(false)

  const fetchPaymentJob = () => {
    getPaymentJob("blik").then((job) => {
      if(job && job.jobId){ // and job status
        setPayment({
          amount: job.amount,
          expires: job.expiresAt,
          comment: job.paymentMeta
        })
        setAmount(job.amount)
      }
    }).catch((e) => { // no job found
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

    setIsLoading(true)
    createPaymentJob({amountPLN: amount, currency: "blik"}).then((data) => {
      setPayment({
        amount: data.amount,
        expires: data.expiresAt,
        comment: data.paymentMeta
      })
      setIsLoading(false)
      setIsEditing(false)
    }).catch((e) => {
      setIsLoading(false)
    })
  }

  return <div className="text-center">

    {/*<div className="absolute top-0.5 right-0.5 rounded-xl border-1 transition-opacity opacity-100 opacity-0"></div>*/}

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
        <div className="mb-1">
          <h3>Реквизиты для пополнения</h3>
          <span className="text-slate-500 text-sm">Действительны до {formatDate(payment.expires)}</span>
          {/*<div className="text-5xl mt-7">*/}
          {/*  {amount} PLN*/}
          {/*</div>*/}

        </div>
        <div className="mt-10 text-center">
          <div className="mb-2">Отправьте точную сумму:</div>
          <ClickToCopy copyData={payment.amount}
                       className="text-5xl mb-2 inline-block pr-5">{payment.amount} PLN</ClickToCopy>

          <div className="w-full flex mt-2 justify-center">
            <button onClick={() => setIsEditing(true)}
                    className="bg-color text-color rounded-2xl p-2 pl-5 pr-5 flex gap-2 justify-center items-center">
              <Image
                src="/icons/icon-pen.svg"
                className="inline-block"
                width={16}
                height={16}
              />
              <span>Изменить</span>
            </button>
          </div>

          <div className="mt-7 mb-2">На этот номер телефона:</div>
          <ClickToCopy copyData={walletAddress}
                       className="mb-8 p-3 bg-color inline-block pr-5 border-2 border-color rounded-2xl border-dashed p-2 border-white">
            {walletAddress}
          </ClickToCopy>
          <div>Обязательно укажите комментарий:</div>
          <ClickToCopy copyData={payment.comment} className="border-2 inline-block border-color bg-color rounded-2xl border-dashed p-3 mt-2 mb-5 rounded">
            {payment.comment}
          </ClickToCopy>
        </div>
      </>
    }


  </div>
}
