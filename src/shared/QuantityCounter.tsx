import {useState} from "react";

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

  return <div className="flex justify-center">
    <button onClick={() => changeQuantity("-")}>-</button>
    <input onChange={(e) => setQuantity(e.target.value)} value={quantity ?? 0}
           className="w-8 text-center text-black"/>
    <button onClick={() => changeQuantity("+")}>+</button>
  </div>
}
