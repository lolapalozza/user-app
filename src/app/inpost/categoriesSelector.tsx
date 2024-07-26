import {useEffect, useState} from "react";
import {getCategories} from "@/app/inpost/api";

export const CategoriesSelector = ({selectedCategory, setSelectedCategory}) => {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then((setCategories))
  }, [])

  const categoryClicked = (id) => {
    if(selectedCategory === id){
      setSelectedCategory(null)
    }else{
      setSelectedCategory(id)
    }
  }

  const categoryButtonClass = (id) => {
    return id === selectedCategory ? "border-2 p-2 bg-red-400 rounded" : "border-2 p-2 rounded"
  }

  return <ul className="flex justify-center flex-wrap gap-2 mb-10 w-full">
    {categories.map((category) => {
      return <li key={category.id}>
        <button className={categoryButtonClass(category.id)} onClick={() => categoryClicked(category.id)}>{category.title}</button>
      </li>
    })}
  </ul>
}
