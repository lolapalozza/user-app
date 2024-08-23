import {Loading} from "@/shared/Loading";
import {useEffect, useState} from "react";
import {createPaymentJob, getPaymentJob} from "@/app/balance/api";
import {formatDate} from "@/app/orders/formatDate";
import {ClickToCopy} from "@/shared/ClickToCopy";

export const DepositBlik = ({walletAddress}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState(0)
  const [payment, setPayment] = useState({})

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
    const interval = setInterval(fetchPaymentJob, 15000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const createPayment = () => {
    setIsLoading(true)
    createPaymentJob({amountPLN: amount, currency: "blik"}).then((data) => {
      console.log(data)
      setPayment({
        amount: data.amount,
        expires: data.expiresAt,
        comment: data.paymentMeta
      })
      setIsLoading(false)
    }).catch((e) => {
      setIsLoading(false)
    })
  }

  return <div className="text-center">

    {/*<div className="absolute top-0.5 right-0.5 rounded-xl border-1 transition-opacity opacity-100 opacity-0"></div>*/}

    <h3>Сумма Депозита (PLN):</h3>
    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number"
           className="bg-transparent text-5xl text-center mb-2 w-40 outline-none" pattern="^\d*$"
           autoFocus/>
    <div className="flex flex-col items-center gap-2 justify-center">
      <button className="border-2 border-white rounded p-2" onClick={createPayment}>Оплатить</button>
      {isLoading && <Loading/>}
    </div>

    {
      payment.amount && <div className="mt-5 text-center">
        <div className="mb-2">Отправьте сумму на этот адрес:</div>
        <ClickToCopy copyData={walletAddress} className="text-2xl mb-5 inline-block pr-5">{walletAddress}</ClickToCopy>
        <div>Обязательно укажите комментарий:</div>
          <ClickToCopy copyData={payment.comment} className="border-2 border-dashed p-2 mt-5 mb-5 rounded">
              {payment.comment}
          </ClickToCopy>
          <div className="mb-5 text-sm">until {formatDate(payment.expires)}</div>
          <p className="mb-20 text-sm">средства зачисляются автоматически</p>
      </div>
    }

  </div>
}
