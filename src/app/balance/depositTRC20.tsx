import QRCode from "react-qr-code";
import {createPaymentJob} from "@/app/balance/api";
import {useEffect, useState} from "react";
import {formatDate} from "@/app/orders/formatDate";
import {Loading} from "@/shared/Loading";

const address = "TWTiiVQpCMndDjGzvGoVDorV99QDKmbhjF"

export const DepositTRC20 = ({onSuccess, job}) => {

  const [amount, setAmount] = useState(0)
  const [payment, setPayment] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(job.jobId){
      setPayment({
        amount: job.cryptoAmount,
        expires: job.expiresAt
      })
      setAmount(job.plnAmount)
    }
  }, [job])

  const createPayment = () => {

    //if USDT job exists
    // if(job.jobId){
    //   window.Telegram.WebApp.showAlert('You\'re gonna create a new payment');
    // }

    setIsLoading(true)
    createPaymentJob(amount).then((data) => {
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
    <h3>Enter amount in PLN</h3>
    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="bg-transparent text-5xl text-center mb-5 w-40 outline-none" pattern="^\d*$"
           autoFocus />
    <div className="flex flex-col items-center gap-2 justify-center">
      <button className="border-2 border-white rounded p-2" onClick={createPayment}>Deposit</button>
      {isLoading && <Loading />}
    </div>

    {
      payment.amount && <div className="mt-10 text-center">
          <div className="mb-2">Deposit exactly this amount:</div>
          <div className="text-5xl">{payment.amount}</div>
          <div className="mb-5 text-sm">until {formatDate(payment.expires)}</div>
          <div className="mb-2">to this USDT address:</div>
          <div className="mb-2">{address}</div>
          <QRCode className="inline-block mb-2" value={address}/>
          <p className="mb-20 text-sm">Your balance will be updated automatically</p>
        </div>
    }

  </div>
}
