import {useState} from "react";
import {SelectCity} from "@/app/drops/steps/SelectCity";
import {SelectProduct} from "@/app/drops/steps/SelectProduct";
import {SelectDrop} from "@/app/drops/steps/SelectDrop";
import Image from "next/image";
import {BreadCrumbs} from "@/app/drops/BreadCrumbs";

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

