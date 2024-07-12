import {QuantityCounter} from "@/shared/QuantityCounter";
import classNames from "classnames";
import {useRouter} from "next/navigation";

export const ProductView = ({product, quantity, setQuantity}) => {

  const router = useRouter()

  const goToProductPage = () => {
    router.push(`/inpost/product/${product.id}`);
  }

  const productItemsClasses = classNames(
    "w-1/3", "p-4", {"border-4": quantity[product.id] > 0}
  );

  return <li className={productItemsClasses}>
    <div className="relative">
      <img onClick={goToProductPage} alt={product.short_description} src={product.photo_urls} className="cursor-pointer" />
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
    <span onClick={goToProductPage} className="cursor-pointer">{product.short_description}</span>
    <p>{product.price} PLN</p>
    {quantity[product.id] > 0 && <div className="mt-4">
      Total Price: {product.price * (quantity[product.id] ?? 0)} PLN
    </div>}
  </li>
}
