import {QuantityCounter} from "@/shared/QuantityCounter";

export const ProductView = ({product, quantity, setQuantity}) => {

  const changeQuantity = (productId, direction) => {

    let _quantity, newValue = 0;

    if(direction === "+"){
      newValue = (quantity[productId] ?? 0) + 1
    }

    if(direction === "-"){
      newValue = (quantity[productId] ?? 0) - 1
    }

    if(newValue < 0) {
      newValue = 0
    }

    _quantity = {
      ...quantity,
      [productId]: newValue
    }

    setQuantity(_quantity)

  }

  const onQuantityChanged = (productId, value) => {
    const _quanity = {...quantity, [productId]: value}
    setQuantity(_quanity)
  }

  return <li className="w-1/4 p-4 relative">
    <img alt={product.short_description} src={product.photo_urls}/>
    <span> {product.short_description}</span>
    <span> {product.price}</span>
    <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
      <QuantityCounter
        quantity={quantity[product.id]}
        setQuantity={
          (value) => {
            let _quantity = {
              ...quantity,
              [product.id]: value
            }
            setQuantity(_quantity)
          }
        } />
      {quantity[product.id] > 0 && <div className="mt-4">
        Total Price: {product.price * (quantity[product.id] ?? 0)}
      </div>}
    </div>
  </li>
}
