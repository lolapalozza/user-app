import {useState} from "react";
import {SelectCity} from "@/app/drops/steps/SelectCity";
import {SelectProduct} from "@/app/drops/steps/SelectProduct";
import {SelectDrop} from "@/app/drops/steps/SelectDrop";

export const DropSelector = ({selection, setSelection}) => {
  return {
    1: <SelectCity selection={selection} setSelection={setSelection} />,
    2: <SelectProduct selection={selection} setSelection={setSelection} />,
    3: <SelectDrop selection={selection} setSelection={setSelection} />
  }[selection.step]
}
