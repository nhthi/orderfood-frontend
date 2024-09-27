import React from 'react'

export const categorizeIngredients = (ingredients) => {
  return ingredients.reduce((total,ingredient)=>{
    let {category} = ingredient
    if(!total[category.name]){
        total[category.name] = []
    }
    total[category.name].push(ingredient)
    return total
  },{})
}


