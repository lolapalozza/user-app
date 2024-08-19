import {useState} from "react";
import {getDropsToBuy} from "@/app/drops/api";
import {Loading} from "@/shared/Loading";

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
    <h2>Select Drop:</h2>

    {
      dropsLoading ? <div className="text-center"><Loading/></div> : <ul className="mt-10 flex gap-1 flex-wrap">
        {
          drops.map((drop, index) => <li key={index}>
            <button className="border-2 border-white p-3 rounded"
                    onClick={() => onDropSelected(drop)}>{selection.product.product} {drop.amount}{drop.unit} - {drop.district.title} - {drop.price} PLN
            </button>
          </li>)
        }
      </ul>
    }


  </div>
}
