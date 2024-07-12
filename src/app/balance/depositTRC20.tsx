import QRCode from "react-qr-code";
import {saveTransaction} from "@/app/balance/api";
import {useState} from "react";

export const DepositTRC20 = ({depositCallback}) => {

  const [amount, setAmount] = useState(0)

  const deposit = () => {
    saveTransaction({amount, paymentType: "trc-20"}).then((response) => {
      if(response.success){
        depositCallback()
        setAmount(0)
      }
    })
  }

  return <div className="text-center">
    <h3>Enter amount in PLN</h3>
    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="bg-transparent text-5xl text-center mb-5 w-40 outline-none" autoFocus />
    <div>
      <button className="border-2 border-white rounded p-2" onClick={deposit}>Deposit</button>
    </div>
  </div>
}


// <p>Deposit with USDT (TRC-20)</p>
// <p className="mb-20">Your balance will be updated automatically</p>
//
// {address}
// <QRCode value={address} />
//
