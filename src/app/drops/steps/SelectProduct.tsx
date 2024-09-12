import {useEffect, useState} from "react";
import {getProductsByCity} from "@/app/drops/api";
import {STEP} from "@/app/drops/DropSelector";
import {Loading} from "@/shared/Loading";
import Image from "next/image";

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

  console.log(products)

  return <div>

    {
      productsLoading ? <div className="text-center"><Loading/></div> : <ul className="justify-center flex gap-1 flex-wrap">
        {
          products.map((product) => <li className="w-full cursor-pointer" key={product.id}>
            <div onClick={() => onProductSelected(product)} className="rounded-3xl w-full p-8 flex justify-between bg-color">
              <div className="flex items-baseline gap-2">
                <img className="mb-2 h-20"
                     src={`${process.env.NEXT_PUBLIC_API_URL}/products_photo/${product.photo}`}/>
                <div className="text-xl">{product.product}</div>
              </div>
              <Image
                src="/icons/icon-arrow-right.svg"
                width={28}
                height={28}
              />
            </div>
          </li>)
        }
      </ul>
    }


  </div>
}
