import {QuantityCounter} from "@/app/inpost/QuantityCounter";
import classNames from "classnames";
import {useRouter} from "next/navigation";

const ICONS = {
  "2": "leaf",
  "4": "leaf",
  "5": "crystal",
  "6": "product",
  "7": "product",
  "8": "leaf",
  "10": "product",
  "12": "product",
  "13": "product",
  "14": "product",
  "15": "yoga",
  "16": "mushroom",
  "17": "brand",
  "18": "product",
  "19": "coconut",
  "20": "product",
  "22": "crystal",
  "23": "flash",
  "24": "product",
  "26": "mushroom",
  "27": "mushroom",
  "30": "product",
  "32": "product",
  "33": "Коproductнфеты",
  "34": "pill",
  "35": "pill",
  "37": "product",
  "39": "product",
  "43": "product",
  "45": "product",
  "46": "mushroom",
  "47": "leaf",
  "48": "leaf",
  "49": "leaf",
  "50": "crystal",
  "51": "leaf",
  "52": "leaf",
  "53": "product",
  "54": "leaf",
  "55": "leaf",
  "56": "leaf",
  "57": "leaf",
  "58": "flash",
  "59": "pill",
  "60": "pill",
  "61": "flash",
  "62": "leaf",
  "63": "product",
  "64": "mushroom",
  "65": "pill"
}


export const ProductView = ({product, quantity, setQuantity}) => {

  const router = useRouter()

  const goToProductPage = () => {
    router.push(`/inpost/product/${product.id}`);
  }

  const productItemsClasses = classNames(
    "w-1/3", "p-4", "text-center", "rounded", "border-red-400",
    {"border-2": quantity[product.id] > 0}
  );

  return <li className={productItemsClasses}>

    <div className="relative flex justify-center mb-1">
      <img onClick={goToProductPage} alt={product.short_description} src={`/icons/icon-${ICONS[product.id]}.png`} className="cursor-pointer dark:invert" width={48} height={48} />
    </div>
    <p onClick={goToProductPage} className="cursor-pointer mb-1">
      <span className="text-2xl">{product.short_description}</span><br />
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
      product={product}
    />
  </li>
}
