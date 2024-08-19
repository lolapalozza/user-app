import Link from "next/link";
import {useEffect, useState} from "react";
import {getBalance} from "@/app/balance/api";
import classNames from "classnames";
import {buyDrop} from "@/app/drops/api";
import Image from "next/image";
import {defaultSelection} from "@/app/drops/page";
import {useRouter} from "next/navigation";

export const Payment = ({selection, setSelection}) => {

  const [balance, setBalance] = useState(0)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const router = useRouter()

  useEffect(() => {
    getBalance().then((_balance) => {
      setBalance(_balance.balance)
    })
  }, [])

  const order = async(e) => {

    e.preventDefault()

    const dropData = {
      cityId: selection.city.id,
      districtId: selection.drop.district.districtId,
      productId: selection.product.id,
      packageId: 2 // @todo add real packageID
    }

    const result = await buyDrop(dropData)
    if(result.success){
      setSelection(defaultSelection())
      router.push(`orders/drops/${result.id}`)
    }
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
      <button disabled={balance < selection.drop.price} onClick={order} className={placeOrderButtonClasses}>
        Place Order
      </button>
      {/*<button className="border-2 border-white rounded p-2">*/}
      {/*  Get Lucky (Game)*/}
      {/*</button>*/}
    </div>

    {
      orderSuccess && <div>
          <Image
              src="/icons/icon-check.png"
              className="dark:invert inline-block mb-5"
              width={64}
              height={64}
          />
          Drop purchased successfully
      </div>
    }

  </div>
}
