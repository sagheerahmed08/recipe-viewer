import RecipeList from '../components/RecipeList'
import { Button } from "../components/ui/button"
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-bold">Recipe Viewer</h1>
        <Link href="/favorites">
          <Button variant="outline">My Favorites</Button>
        </Link>
      </div>
      <RecipeList />
    </div>
  )
}

