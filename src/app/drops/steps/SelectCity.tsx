import {useEffect, useState} from "react";
import {getCitiesWithProducts} from "@/app/drops/api";
import {STEP} from "@/app/drops/DropSelector";
import {Loading} from "@/shared/Loading";
import Image from "next/image";

export const SelectCity = ({selection, setSelection}) => {

  const [cities, setCities] = useState([])
  const [citiesLoading, setCitiesLoading] = useState(false)

  useEffect(() => {
    setCitiesLoading(true)
    getCitiesWithProducts().then((_cities) => {
      setCities(_cities)
      setCitiesLoading(false)
    })
  }, [])

  const onCitySelected = (city) => {
    const _selection = {
      ...selection,
      city: city,
      step: STEP.PRODUCT
    }
    setSelection(_selection)
  }
  return <div>
    {/*<h2>Выберите город:</h2>*/}

    {
      citiesLoading ? <div className="text-center"><Loading/></div> : <div>
        {
          cities.length ? <ul className="justify-center flex gap-2 flex-wrap">
            {
              cities.map((city) => <li className="w-full cursor-pointer" key={city.id}>
                <div onClick={() => onCitySelected(city)} className="rounded-3xl w-full p-8 flex justify-between bg-color">
                  <div className="text-xl">{city.name}</div>
                  <Image
                    src="/icons/icon-arrow-right.svg"
                    width={28}
                    height={28}
                  />
                </div>
              </li>)
            }
          </ul> : <div className="text-center mt-5">
            В данный момент нет доступных позиций
          </div>
        }
      </div>

    }


  </div>
}
