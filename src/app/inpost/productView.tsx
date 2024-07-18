import {QuantityCounter} from "@/app/inpost/QuantityCounter";
import classNames from "classnames";
import {useRouter} from "next/navigation";

export const ProductView = ({product, quantity, setQuantity}) => {

  const router = useRouter()

  const goToProductPage = () => {
    router.push(`/inpost/product/${product.id}`);
  }

  const productItemsClasses = classNames(
    "w-1/3", "p-4", "text-center", "rounded", "border-lime-500",
    {"border-2": quantity[product.id] > 0}
  );

  return <li className={productItemsClasses}>

    <div className="relative flex justify-center mb-1">
      <img onClick={goToProductPage} alt={product.short_description} src="/icons/icon-product.png" className="cursor-pointer dark:invert" width={48} height={48} />
    </div>
    <p onClick={goToProductPage} className="cursor-pointer mb-1">
      {product.short_description} <br />
      {`${product.price} PLN`}
    </p>
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
      }
      measure={product.measure}
    />
  </li>
}
