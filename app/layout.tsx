import './globals.css'
import '../styles/button.css'
import '../styles/recipes.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recipe Viewer',
  description: 'Browse and save your favorite recipes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  )
}

