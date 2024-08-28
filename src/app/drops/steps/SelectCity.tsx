import {useEffect, useState} from "react";
import {getCitiesWithProducts} from "@/app/drops/api";
import {STEP} from "@/app/drops/DropSelector";
import {Loading} from "@/shared/Loading";

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
    <h2>Выберите город:</h2>

    {
      citiesLoading ? <div className="text-center"><Loading/></div> : <div>
        {
          cities.length ? <ul className="mt-10 justify-center flex gap-1 flex-wrap">
            {
              cities.map((city) => <li key={city.id}>
                <button className="border-2 border-white p-3 rounded"
                        onClick={() => onCitySelected(city)}>{city.name}</button>
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
