import {QuantityCounter} from "@/app/inpost/QuantityCounter";
import classNames from "classnames";
import {useRouter} from "next/navigation";

export const ProductView = ({product, quantity, setQuantity}) => {

  const router = useRouter()

  const goToProductPage = () => {
    router.push(`/inpost/product/${product.id}`);
  }

  const productItemsClasses = classNames(
    "pt-4", "pb-4", "text-center", "rounded-2xl", "bg-color", "w-48percent"
  );

  return <li className={productItemsClasses}>

    <div className="relative flex justify-center mb-1">
      <img onClick={goToProductPage} alt={product.short_description} src={`/icons/icon-${product.category_picture}.png`} className="cursor-pointer dark:invert" width={48} height={48} />
    </div>
    <p onClick={goToProductPage} className="cursor-pointer mb-1">
      <span className="text-2xl">{product.short_description}</span><br />
      {`${product.price} PLN`}
    </p>
    <QuantityCounter
      quantity={quantity[product.id]}
      setQuantity={(value) => {
        let _quantity;

        if (value === 0) {
          // Remove the property if the value is 0
          const { [product.id]: _, ...rest } = quantity;
          _quantity = rest;
        } else {
          // Set the new value otherwise
          _quantity = {
            ...quantity,
            [product.id]: value,
          };
        }

        setQuantity(_quantity);
      }}
      product={product}
    />
  </li>
}
