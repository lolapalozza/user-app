import {useEffect, useState} from "react";
import {getCitiesWithProducts} from "@/app/drops/api";

export const SelectCity = ({selection, setSelection}) => {

  const [cities, setCities] = useState([])

  useEffect(() => {
    getCitiesWithProducts().then((_cities) => {
      setCities(_cities)
    })
  }, [])

  const onCitySelected = (city) => {
    const _selection = {
      ...selection,
      city: city,
      step: selection.step + 1
    }
    setSelection(_selection)
  }
  return <div>
    <h2>Select City</h2>

    <ul className="mt-20 flex gap-1">
      {
        cities.map((city) => <li key={city.id}>
          <button className="border-2 border-white p-3 rounded" onClick={() => onCitySelected(city)}>{city.name}</button>
        </li>)
      }
    </ul>

  </div>
}
