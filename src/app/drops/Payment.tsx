import Link from "next/link";
import {useEffect, useState} from "react";
import {getBalance} from "@/app/balance/api";

export const Payment = ({selection}) => {

  const [balance, setBalance] = useState(0)

  useEffect(() => {
    getBalance(1).then((_balance) => {
      setBalance(_balance.balance)
    })
  }, [])

  const order = () => {
    console.log("order")
  }

  return <div>

    <h2 className="mb-5">Ready to Order?</h2>

    <p className="mb-5">Your Balance is: {balance}</p>

    <p
      className="mb-5">{selection.product.product} {selection.drop.district.title} {selection.drop.amount}{selection.drop.unit} - {selection.drop.price}</p>

    <div className="flex gap-2">
      <Link href="/orders">
        <button onClick={order} className="border-2 border-white rounded p-2">
          Place Order
        </button>
      </Link>
      <Link href="/orders">
        <button disabled={true} className="border-2 border-white rounded p-2 bg-gray-700">
          Get Lucky (Game)
        </button>
      </Link>
    </div>

  </div>
}
