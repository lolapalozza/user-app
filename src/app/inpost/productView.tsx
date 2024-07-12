import {QuantityCounter} from "@/shared/QuantityCounter";
import classNames from "classnames";

export const ProductView = ({product, quantity, setQuantity}) => {

  const productItemsClasses = classNames(
    "w-1/4", "p-4", {"border-4": quantity[product.id] > 0}
  );

  return <li className={productItemsClasses}>
    <div className="relative">
      <img alt={product.short_description} src={product.photo_urls}/>
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
          }/>
      </div>
    </div>
    <span> {product.short_description}</span>
    <span> {product.price}</span>
    {quantity[product.id] > 0 && <div className="mt-4">
      Total Price: {product.price * (quantity[product.id] ?? 0)} PLN
    </div>}
  </li>
}
