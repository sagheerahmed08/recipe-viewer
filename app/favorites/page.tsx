import FavoritesList from '../../components/FavoritesList'
import Link from 'next/link'

export default function FavoritesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Favorite Recipes</h1>
        <Link href="/" className="favorite-button">
          Back to Recipes
        </Link>
      </div>

      <FavoritesList />

      <div className="text-center py-8">
        <Link href="/" className="favorite-button">
          Browse Recipes
        </Link>
      </div>
    </div>
  )
}

