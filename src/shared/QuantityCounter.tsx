export const QuantityCounter = ({quantity, setQuantity}) => {

  const changeQuantity = (direction) => {

    let newValue = 0;

    if(direction === "+"){
      newValue = (quantity ?? 0) + 1
    }

    if(direction === "-"){
      newValue = (quantity ?? 0) - 1
    }

    if(newValue < 0) {
      newValue = 0
    }

    setQuantity(newValue)

  }

  if((!quantity || quantity === 0)) return (<button className="text-2xl" onClick={() => setQuantity(1)}>Add</button>);

  return <div className="flex justify-center">
      <button className="text-2xl" onClick={() => changeQuantity("-")}>-</button>
      <input type="text" className="w-8 text-center bg-transparent text-5xl"
           onChange={(e) => setQuantity(e.target.value)} value={quantity ?? 0}/>
      <button className="text-2xl" onClick={() => changeQuantity("+")}>+</button>
    </div>


}
