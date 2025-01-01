'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { supabase } from '../../../lib/supabase'

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strInstructions: string
  [key: string]: string
}

export default function RecipeDetails({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`)
        setRecipe(response.data.meals[0])
        checkIfFavorite()
      } catch (error) {
        console.error('Error fetching recipe:', error)
      }
    }

    fetchRecipe()
  }, [params.id])

  const checkIfFavorite = async () => {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('recipe_id', params.id)
      .single()

    if (error) {
      console.error('Error checking favorite:', error)
    } else {
      setIsFavorite(!!data)
    }
  }

  const toggleFavorite = async () => {
    if (isFavorite) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('recipe_id', params.id)

      if (error) {
        console.error('Error removing favorite:', error)
      } else {
        setIsFavorite(false)
      }
    } else {
      const { error } = await supabase
        .from('favorites')
        .insert({
          recipe_id: recipe?.idMeal,
          recipe_name: recipe?.strMeal,
          recipe_image: recipe?.strMealThumb
        })

      if (error) {
        console.error('Error adding favorite:', error)
      } else {
        setIsFavorite(true)
      }
    }
  }

  if (!recipe) {
    return <div>Loading...</div>
  }

  const ingredients = Object.keys(recipe)
    .filter(key => key.startsWith('strIngredient') && recipe[key])
    .map(key => {
      const index = key.replace('strIngredient', '')
      return `${recipe[key]} - ${recipe[`strMeasure${index}`]}`
    })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full max-w-2xl mx-auto rounded-lg shadow-md mb-8" />
      <button
        onClick={toggleFavorite}
        className={`mb-8 px-4 py-2 rounded ${isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors`}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
      <ul className="list-disc pl-6 mb-8">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
      <p className="whitespace-pre-line">{recipe.strInstructions}</p>
    </div>
  )
}

