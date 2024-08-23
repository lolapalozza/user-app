import QRCode from "react-qr-code";
import {createPaymentJob, getPaymentJob} from "@/app/balance/api";
import {useEffect, useState} from "react";
import {formatDate} from "@/app/orders/formatDate";
import {Loading} from "@/shared/Loading";
import {ClickToCopy} from "@/shared/ClickToCopy";

export const DepositTRC20 = ({onSuccess, walletAddress}) => {

  const [amount, setAmount] = useState(0)
  const [payment, setPayment] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

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
    const interval = setInterval(fetchPaymentJob, 15000)
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
    }).catch((e) => {
      setIsLoading(false)
    })
  }

  return <div className="text-center">
    <h3>Сумма Депозита (PLN):</h3>
    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="bg-transparent text-5xl text-center mb-5 w-40 outline-none" pattern="^\d*$"
           autoFocus />
    <div className="flex flex-col items-center gap-2 justify-center">
      <button className="border-2 border-white rounded p-2" onClick={createPayment}>Оплатить</button>
      {isLoading && <Loading />}
      {message}
    </div>

    {
      payment.amount && <div className="mt-10 text-center">
          <div className="mb-2">Отправьте точную сумму:</div>
          <ClickToCopy copyData={payment.amount} className="text-5xl inline-block pr-5">{payment.amount}</ClickToCopy>
          <div className="mb-5 text-sm">until {formatDate(payment.expires)}</div>
          <div className="mb-2">на этот адрес:</div>
          <ClickToCopy copyData={walletAddress} className="mb-2 inline-block pr-5">{walletAddress}</ClickToCopy>
          <QRCode className="inline-block mb-2" value={walletAddress}/>
          <p className="mb-20 text-sm">средства зачисляются автоматически</p>
        </div>
    }

  </div>
}
