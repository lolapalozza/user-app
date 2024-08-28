import Link from "next/link";
import {useEffect, useState} from "react";
import {getBalance} from "@/app/balance/api";
import classNames from "classnames";
import {buyDrop} from "@/app/drops/api";
import Image from "next/image";
import {defaultSelection} from "@/app/drops/page";
import {useRouter} from "next/navigation";
import {Loading} from "@/shared/Loading";

export const Payment = ({selection, setSelection}) => {

  const [balance, setBalance] = useState(0)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    getBalance().then((_balance) => {
      setBalance(_balance.balance)
      setLoading(false)
    })
  }, [])

  const order = async(e) => {

    setLoading(true)

    e.preventDefault()

    const dropData = {
      cityId: selection.city.id,
      districtId: selection.drop.district.districtId,
      productId: selection.product.id,
      packageId: selection.drop.package_id
    }

    const result = await buyDrop(dropData)

    setLoading(false)

    if(result.success){
      router.push(`orders/drops/${result.id}`)
      // setSelection(defaultSelection())
    }
  }

  const balanceClass = classNames({
    "text-red-400": balance < selection.drop.price
  })

  const placeOrderButtonClasses = classNames("border-2", "border-white", "rounded", "p-2", {
    "opacity-50": balance < selection.drop.price
  })

  return <div>

    <img className="w-6/12 mb-2" src={`${process.env.NEXT_PUBLIC_API_URL}/products_photo/${selection.product.photo}`} />

    <p className="mb-2">{selection.product.product} - {selection.drop.amount}{selection.drop.unit} </p>
    <p className="mb-5">{selection.city.name} - {selection.drop.district.title} </p>

    <hr className="color-white w-full mb-5"/>

    <div className="flex gap-2 flex-col mb-5">
      <span>Стоимость: {selection.drop.price} PLN</span>
      <span className={balanceClass}>Ваш Баланс: {balance} PLN</span>
      {
        balance < selection.drop.price &&
          <span className="text-sm">У вас недостаточно средств. Пополните свой <Link
              className="text-blue-300" href="/balance">баланс</Link></span>
      }
    </div>


    <div className="flex gap-2 mb-2">
      <button disabled={balance < selection.drop.price} onClick={order} className={placeOrderButtonClasses}>
        Купить
      </button>
      {/*<button className="border-2 border-white rounded p-2">*/}
      {/*  Get Lucky (Game)*/}
      {/*</button>*/}
    </div>

    {
      loading && <Loading />
    }

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
