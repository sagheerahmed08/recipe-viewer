'use client'

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strInstructions: string
  [key: string]: string
}

interface RecipeModalProps {
  recipe: Recipe | null
  isOpen: boolean
  onClose: () => void
  isFavorite: boolean
  onFavoriteToggle: () => void
}

export function RecipeModal({ recipe, isOpen, onClose, isFavorite, onFavoriteToggle }: RecipeModalProps) {
  if (!recipe || !isOpen) return null

  const ingredients = Object.keys(recipe)
    .filter(key => key.startsWith('strIngredient') && recipe[key])
    .map(key => {
      const index = key.replace('strIngredient', '')
      return `${recipe[key]} - ${recipe[`strMeasure${index}`]}`
    })

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <button
            className={`favorite-button ${isFavorite ? "favorited" : ""}`}
            onClick={onFavoriteToggle}
          >
            ❤️
          </button>
          <h2 className="modal-title">{recipe.strMeal}</h2>
          <button className="close-button" onClick={onClose}>
            ✖️
          </button>
        </div>
        <div className="modal-body">
          <div className="recipe-image-container">
            <img 
              src={recipe.strMealThumb} 
              alt={recipe.strMeal} 
              className="recipe-image"
            />
          </div>
          
          <div className="recipe-details">
            <h3>Ingredients</h3>
            <ul className="ingredients-list">
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="recipe-instructions">
            <h3>Instructions</h3>
            <p>{recipe.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

