import { redirect, Route as RouteImpl } from '@tanstack/react-router'
import { useFavorites } from '@/hooks/use-favorites'
import { DogCard } from '@/components/features/dog-card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { rootRoute } from '@/lib/root-route'

export const Route = new RouteImpl({
  getParentRoute: () => rootRoute,
  path: '/favorites/',
  component: FavoritesRoute,
  beforeLoad: () => {
    // Check if user has permission to access favorites
    const user = localStorage.getItem('dogGalleryUser')
    if (!user) {
      throw redirect({
        to: '/auth/login',
      })
    }
    
    const userData = JSON.parse(user)
    if (!userData.permissions.includes('manage:favorites')) {
      throw redirect({
        to: '/',
      })
    }
    
    return {}
  },
})

function FavoritesRoute() {
  const { favorites, clearFavorites, canManageFavorites } = useFavorites()
  const { isAuthenticated } = useAuth()
  
  // Redirect if not authenticated or doesn't have permission
  if (!isAuthenticated || !canManageFavorites) {
    throw redirect({
      to: '/auth/login',
    })
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Favorites</h1>
          <p className="text-muted-foreground">
            Your collection of favorite dog images
          </p>
        </div>
        
        {favorites.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFavorites}
            className="flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>
      
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-center text-lg text-muted-foreground">
            You haven't added any favorites yet
          </p>
          <Button variant="link" asChild className="mt-2">
            <a href="/">Browse the gallery to add some</a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((favorite) => (
            <DogCard
              key={favorite.id}
              imageUrl={favorite.imageUrl}
              breed={favorite.breed}
            />
          ))}
        </div>
      )}
    </div>
  )
} 