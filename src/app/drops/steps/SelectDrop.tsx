import {useState} from "react";
import {getDropsToBuy} from "@/app/drops/api";

export const SelectDrop = ({selection, setSelection}) => {
  const [drops, setDrops] = useState([])

  useState(() => {
    getDropsToBuy(selection.city.id, selection.product.id).then((_drops) => {
      setDrops(_drops)
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
    <h2>Select Drop</h2>

    <ul className="mt-20 flex gap-1 flex-wrap">
      {
        drops.map((drop, index) => <li key={index}>
          <button className="border-2 border-white p-3 rounded" onClick={() => onDropSelected(drop)}>{selection.product.product}: {drop.district.title} - {drop.amount}{drop.unit} - {drop.price} PLN</button>
        </li>)
      }
    </ul>

  </div>
}
