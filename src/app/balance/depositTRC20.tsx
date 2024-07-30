import QRCode from "react-qr-code";
import {createPaymentJob, saveTransaction} from "@/app/balance/api";
import {useState} from "react";
import {formatDate} from "@/app/orders/formatDate";

const address = "12312542523123"

export const DepositTRC20 = ({depositCallback}) => {

  const [amount, setAmount] = useState(0)
  const [payment, setPayment] = useState({})

  const deposit = () => { // this is test function
    saveTransaction({amount, paymentType: "trc-20"}).then((response) => {
      if(response.success){
        depositCallback()
        setAmount(0)
      }
    })
  }

  const createPayment = () => {
    createPaymentJob(amount).then((data) => {
      setPayment({
        amount: data.amountUsdt,
        expires: data.expiresAt
      })
    })
  }

  return <div className="text-center">
    <h3>Enter amount in PLN</h3>
    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="bg-transparent text-5xl text-center mb-5 w-40 outline-none" autoFocus />
    <div className="flex gap-2 justify-center">
      <button className="border-2 border-white rounded p-2" onClick={createPayment}>Deposit</button>
      <button className="border-2 border-white rounded p-2" onClick={deposit}>Fake Deposit</button>
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


//
