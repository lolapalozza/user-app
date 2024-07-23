export const QuantityCounter = ({quantity, setQuantity, product}) => {

  const changeQuantity = (direction) => {

    let newValue = 0;

    if(direction === "+"){
      newValue = Number(((quantity ?? 0) + product.min_cart_step).toFixed(1))
    }

    if(direction === "-"){
      newValue = Number(((quantity ?? 0) - product.min_cart_step).toFixed(1))
    }

    if(newValue < 0) {
      newValue = 0
    }

    setQuantity(newValue)

  }

  if((!quantity || quantity === 0)) return (<button className="text-l border-2 border-white p-1 rounded" onClick={() => setQuantity(1)}>Add</button>);

  return <div>
    <div className="flex justify-between">
      <button className="text-2xl" onClick={() => changeQuantity("-")}>-</button>
      <input type="text" className="min-w-1 max-w-40 text-center bg-transparent text-3xl"
           onChange={(e) => setQuantity(e.target.value)} value={quantity ?? 0}/>
      <button className="text-2xl" onClick={() => changeQuantity("+")}>+</button>
    </div>
    <div className="flex justify-center text-xs">
      {product.measure}
    </div>
  </div>


}
