import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/app/cartContext";
import {getProducts} from "@/app/inpost/api";

export const SelectProduct = ({selection, setSelection}) => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then((_products) => setProducts(_products))
  }, [])

  const onProductSelected = (product) => {
    const _selection = {
      ...selection,
      productId: product.id,
      productTitle: product.short_description,
      step: selection.step + 1
    }
    setSelection(_selection)
  }

  return <div>
    <h2>Select Product from {selection.city}</h2>
    <ul className="mt-20">
      {
        products.map((product) => <li key={product.id}>
          <button onClick={() => onProductSelected(product)}>{product.short_description}</button>
        </li>)
      }
    </ul>
  </div>
}
