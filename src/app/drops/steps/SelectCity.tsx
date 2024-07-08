const cities = ["Los Angeles", "New York", "Chicago", "Salt Lake City"]

export const SelectCity = ({selection, setSelection}) => {
  const onCitySelected = (city) => {
    const _selection = {
      ...selection,
      city,
      step: selection.step + 1
    }
    setSelection(_selection)
  }
  return <div>
    <h2>Select City</h2>

    <ul className="mt-20">
      {
        cities.map((city) => <li key={city}>
          <button onClick={() => onCitySelected(city)}>{city}</button>
        </li>)
      }
    </ul>

  </div>
}
