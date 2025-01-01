'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { RecipeModal } from './recipe-modal'

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strInstructions: string
  [key: string]: string
}

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        setRecipes(response.data.meals)
      } catch (error) {
        console.error('Error fetching recipes:', error)
      }
    }

    fetchRecipes()
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (recipe: Recipe) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(recipe.idMeal)) {
        return prevFavorites.filter(id => id !== recipe.idMeal)
      } else {
        return [...prevFavorites, recipe.idMeal]
      }
    })
  }

  return (
    <>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card">
            <div className="recipe-image-container">
              <img 
                src={recipe.strMealThumb} 
                alt={recipe.strMeal} 
                className="recipe-image"
                onClick={() => setSelectedRecipe(recipe)}
              />
            </div>
            <div className="recipe-content">
              <h3 className="recipe-title" onClick={() => setSelectedRecipe(recipe)}>
                {recipe.strMeal}
              </h3>
              <button
                className={`favorite-button ${favorites.includes(recipe.idMeal) ? "favorited" : ""}`}
                onClick={() => toggleFavorite(recipe)}
              >
                ❤️ {favorites.includes(recipe.idMeal) ? "Remove" : "Favorite"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <RecipeModal 
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        isFavorite={selectedRecipe ? favorites.includes(selectedRecipe.idMeal) : false}
        onFavoriteToggle={() => selectedRecipe && toggleFavorite(selectedRecipe)}
      />
    </>
  )
}

