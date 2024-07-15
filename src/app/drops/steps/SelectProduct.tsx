import {useEffect, useState} from "react";
import {getProductsByCity} from "@/app/drops/api";

export const SelectProduct = ({selection, setSelection}) => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    getProductsByCity(selection.city.id).then((_products) => setProducts(_products))
  }, [])

  const onProductSelected = (product) => {
    const _selection = {
      ...selection,
      product,
      productTitle: product.short_description,
      step: selection.step + 1
    }
    setSelection(_selection)
  }

  return <div>
    <h2>Select Product from {selection.city.name}</h2>
    <ul className="mt-20 flex gap-1 flex-wrap">
      {
        products.map((product) => <li key={product.id}>
          <button className="border-2 border-white p-3 rounded" onClick={() => onProductSelected(product)}>{product.product}</button>
        </li>)
      }
    </ul>
  </div>
}
