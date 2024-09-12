import {SelectCity} from "@/app/drops/steps/SelectCity";
import {SelectProduct} from "@/app/drops/steps/SelectProduct";
import {SelectDrop} from "@/app/drops/steps/SelectDrop";

export const STEP = {
  CITY: "city",
  PRODUCT: "product",
  DROP: "drop"
}

export const DropSelector = ({selection, setSelection}) => {
  return <>
    {selection.step === STEP.CITY && <SelectCity selection={selection} setSelection={setSelection}/>}
    {selection.step === STEP.PRODUCT && <SelectProduct selection={selection} setSelection={setSelection}/>}
    {selection.step === STEP.DROP && <SelectDrop selection={selection} setSelection={setSelection}/>}
  </>
}

