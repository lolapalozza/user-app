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
      district: drop.district,
      amount: drop.amount,
      unit: drop.unit,
      price: drop.price
    }
    setSelection(_selection)
  }
  return <div>
    <h2>Select Drop</h2>

    <ul className="mt-20">
      {
        drops.map((drop, index) => <li key={index}>
          <button onClick={() => onDropSelected(drop)}>{selection.productTitle} {drop.district.title} {drop.amount}{drop.unit} - {drop.price} PLN</button>
        </li>)
      }
    </ul>

  </div>
}
