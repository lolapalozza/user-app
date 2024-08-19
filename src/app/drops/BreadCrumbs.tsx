import Image from "next/image";
import {STEP} from "@/app/drops/DropSelector";

export const BreadCrumbs = ({selection, setSelection}) => {

  const goToStep = (step) => {
    const _selection = {
      product: undefined,
      district: undefined,
      amount: undefined,
      unit: undefined,
      price: undefined,
      productId: undefined,
      productTitle: undefined,
      drop: undefined,
      dropId: undefined,
      city: step === STEP.CITY ? undefined : selection.city,
      step
    }
    setSelection(_selection)
  }

  return <div className="mb-5">
    <div>{selection.city &&
        <div className="flex items-center gap-1">Город: {selection.city.name} <i onClick={() => goToStep(STEP.CITY)}>
          <Image
              src="/icons/icon-edit.png"
              className="dark:invert"
              width={16}
              height={16}
          />
        </i></div>}</div>
    <div>{selection.product && <div className="flex items-center gap-1">Продукт: {selection.product.product} <i
        onClick={() => goToStep(STEP.PRODUCT)}>
      <Image
          src="/icons/icon-edit.png"
          className="dark:invert"
          width={16}
          height={16}
      />
    </i></div>}</div>
  </div>
}

