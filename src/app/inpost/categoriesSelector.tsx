import {useEffect, useState} from "react";
import {getCategories} from "@/app/inpost/api";

export const CategoriesSelector = ({selectedCategory, setSelectedCategory}) => {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then((setCategories))
  }, [])

  const categoryClicked = (id) => {
    if(!id){
      return setSelectedCategory(null)
    }
    if(selectedCategory === id){
      setSelectedCategory(null)
    }else{
      setSelectedCategory(id)
    }
  }

  const categoryButtonClass = (id) => {
    const activeClasses = "p-2 pl-5 pr-5 bg-color-3 rounded-2xl"
    const classes = "p-2 pl-5 pr-5 rounded-2xl bg-color"
    return id === selectedCategory ? activeClasses : classes
  }

  return <ul className="flex overflow-auto gap-2 mb-10 w-full">
    <li>
      <button className={categoryButtonClass(null)}
              onClick={() => categoryClicked()}>Все</button>
    </li>
    {categories.map((category) => {
      return <li key={category.id}>
        <button className={categoryButtonClass(category.id)}
                onClick={() => categoryClicked(category.id)}>{category.title}</button>
      </li>
    })}
  </ul>
}
