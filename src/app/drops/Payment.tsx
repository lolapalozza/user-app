import Link from "next/link";
import {useEffect, useState} from "react";
import {getBalance} from "@/app/balance/api";
import classNames from "classnames";
import {className} from "postcss-selector-parser";

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

  const balanceClass = classNames({
    "text-red-400": balance < selection.drop.price
  })

  const placeOrderButtonClasses = classNames("border-2", "border-white", "rounded", "p-2", {
    "opacity-50": balance < selection.drop.price
  })

  return <div>

    <h2 className="mb-5">Ready to Order?</h2>

    <p className="mb-2">{selection.product.product} - {selection.drop.amount}{selection.drop.unit} </p>
    <p className="mb-5">{selection.city.name} - {selection.drop.district.title} </p>

    <hr className="color-white w-full mb-5"/>

    <div className="flex gap-2 flex-col mb-5">
      <span>Total Price: {selection.drop.price} PLN</span>
      <span className={balanceClass}>Your Balance: {balance} PLN</span>
      {
        balance < selection.drop.price &&
          <span className="text-sm">You have insufficient funds to purchase this order. Please fill up your <Link
              className="text-blue-300" href="/balance">balance</Link></span>
      }
    </div>


    <div className="flex gap-2">
      <Link href="/orders">
        <button disabled={balance < selection.drop.price} onClick={order} className={placeOrderButtonClasses}>
          Place Order
        </button>
      </Link>
      <Link href="/orders">
        <button className="border-2 border-white rounded p-2">
          Get Lucky (Game)
        </button>
      </Link>
    </div>

  </div>
}
