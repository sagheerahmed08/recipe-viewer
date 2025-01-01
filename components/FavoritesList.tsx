'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

export default function FavoritesList() {
  const [favorites, setFavorites] = useState<Recipe[]>([])

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = localStorage.getItem('favorites')
      if (storedFavorites) {
        const favoriteIds = JSON.parse(storedFavorites)
        const favoriteRecipes = await Promise.all(
          favoriteIds.map(async (id: string) => {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            return response.data.meals[0]
          })
        )
        setFavorites(favoriteRecipes)
      }
    }

    fetchFavorites()
  }, [])

  const removeFavorite = (id: string) => {
    setFavorites(prevFavorites => prevFavorites.filter(fav => fav.idMeal !== id))
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      const favoriteIds = JSON.parse(storedFavorites)
      const updatedFavorites = favoriteIds.filter((favId: string) => favId !== id)
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }
  }

  return (
    <div className="recipe-grid">
      {favorites.map((favorite) => (
        <div key={favorite.idMeal} className="recipe-card">
          <div className="recipe-image-container">
            <img src={favorite.strMealThumb} alt={favorite.strMeal} className="recipe-image" />
          </div>
          <div className="recipe-content">
            <h3 className="recipe-title">{favorite.strMeal}</h3>
            <button
              className="favorite-button favorited"
              onClick={() => removeFavorite(favorite.idMeal)}
            >
              ❤️ Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

