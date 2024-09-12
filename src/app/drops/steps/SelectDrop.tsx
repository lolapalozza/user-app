import {useState} from "react";
import {getDropsToBuy} from "@/app/drops/api";
import {Loading} from "@/shared/Loading";
import Image from "next/image";

export const SelectDrop = ({selection, setSelection}) => {
  const [drops, setDrops] = useState([])
  const [dropsLoading, setDropsLoading] = useState(false)

  useState(() => {
    setDropsLoading(true)
    getDropsToBuy(selection.city.id, selection.product.id).then((_drops) => {
      setDrops(_drops)
      setDropsLoading(false)
    })
  },[])

   const onDropSelected = (drop) => {
    const _selection = {
      ...selection,
      drop
    }
    setSelection(_selection)
  }
  return <div>

    {
      dropsLoading ? <div className="text-center"><Loading/></div> : <ul className="justify-center flex gap-1 flex-wrap">
        {
          drops.map((drop, index) => <li className="w-full cursor-pointer" key={index}>
            <div onClick={() => onDropSelected(drop)} className="rounded-3xl w-full p-8 flex justify-between bg-color">
              <div className="text-xl">{selection.product.product} {drop.amount}{drop.unit} - {drop.district.title} - {drop.price} PLN</div>
              <Image
                src="/icons/icon-arrow-right.svg"
                width={28}
                height={28}
              />
            </div>
          </li>)
        }
      </ul>
    }


  </div>
}
