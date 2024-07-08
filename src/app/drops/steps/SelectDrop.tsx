const drops = [
  {id: 1,
  product: "Шишка",
  district: "Центральный",
  amount: 3,
  unit: "g",
  price: 30},
  {id: 2,
    product: "Шишка",
    district: "Брайтон Бич",
    amount: 3,
    unit: "g",
    price: 30},
  {id: 3,
    product: "Шишка",
    district: "Брайтон Бич",
    amount: 5,
    unit: "g",
    price: 80}
]

export const SelectDrop = ({selection, setSelection}) => {
  const onDropSelected = (drop) => {
    const _selection = {
      ...selection,
      dropId: drop.id,
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
        drops.map((drop) => <li key={drop.id}>
          <button onClick={() => onDropSelected(drop)}>{selection.productTitle} {drop.district} {drop.amount}{drop.unit} - {drop.price}</button>
        </li>)
      }
    </ul>

  </div>
}
