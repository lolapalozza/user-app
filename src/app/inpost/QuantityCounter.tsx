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

  if((quantity === null || quantity === undefined || quantity === 0)) return (<button className="bg-color mt-2 text-color rounded-3xl p-2 pl-5 pr-5 w-full flex gap-2 justify-center items-center" onClick={() => setQuantity(product.min_cart_step)}>Купить</button>);

  return <div>
    <div className="flex justify-between bg-color rounded-3xl p-2 items-center">
      <button className="text-2xl rounded-3xl w-7 h-7 bg-color-5 flex items-center text-red-600 justify-center" onClick={() => changeQuantity("-")}>-</button>
      <div className="min-w-12 max-w-28 text-center bg-transparent flex items-center justify-center text-3xl">{quantity ?? 0}</div>
      <button className="text-2xl rounded-3xl w-7 h-7 bg-color-3 flex items-center justify-center" onClick={() => changeQuantity("+")}>+</button>
    </div>
    <div className="flex justify-center text-xs">
      {product.measure}
    </div>
  </div>


}
