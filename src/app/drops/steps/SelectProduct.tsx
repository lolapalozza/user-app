import {useEffect, useState} from "react";
import {getProductsByCity} from "@/app/drops/api";
import {STEP} from "@/app/drops/DropSelector";
import {Loading} from "@/shared/Loading";

export const SelectProduct = ({selection, setSelection}) => {

  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(false)

  useEffect(() => {
    setProductsLoading(true)
    getProductsByCity(selection.city.id).then((_products) => {
      setProducts(_products)
      setProductsLoading(false)
    })
  }, [])

  const onProductSelected = (product) => {
    const _selection = {
      ...selection,
      product,
      productTitle: product.short_description,
      step: STEP.DROP
    }
    setSelection(_selection)
  }

  return <div>
    <h2>Выберите Продукт:</h2>

    {
      productsLoading ? <div className="text-center"><Loading/></div> : <ul className="mt-10 justify-center flex gap-1 flex-wrap">
        {
          products.map((product) => <li key={product.id}>
            <button className="border-2 border-white p-3 rounded"
                    onClick={() => onProductSelected(product)}>{product.product}</button>
          </li>)
        }
      </ul>
    }


  </div>
}
