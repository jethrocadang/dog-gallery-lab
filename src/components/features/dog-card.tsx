import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Expand } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFavorites } from '@/hooks/use-favorites'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'

interface DogCardProps {
  imageUrl: string
  breed?: string
  className?: string
}

export function DogCard({ imageUrl, breed, className }: DogCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { toggleFavorite, isFavorite, canManageFavorites } = useFavorites()
  const breedName = breed || extractBreedFromUrl(imageUrl)
  const formattedBreed = breedName ? formatBreedName(breedName) : 'Unknown Breed'
  
  // Extract breed from URL if not provided
  function extractBreedFromUrl(url: string): string | undefined {
    try {
      // URL format: https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg
      const parts = url.split('/breeds/')[1]?.split('/')
      return parts ? parts[0] : undefined
    } catch {
      return undefined
    }
  }
  
  // Format breed name for display
  function formatBreedName(breed: string): string {
    return breed
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  }
  
  const handleFavoriteClick = () => {
    toggleFavorite(imageUrl, breedName)
  }
  
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          {isLoading && (
            <Skeleton className="absolute inset-0 h-full w-full" />
          )}
          <img
            src={imageUrl}
            alt={formattedBreed}
            className={cn(
              'h-full w-full object-cover transition-all hover:scale-105',
              isLoading ? 'opacity-0' : 'opacity-100'
            )}
            onLoad={() => setIsLoading(false)}
          />
          
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              >
                <Expand className="h-4 w-4" />
                <span className="sr-only">View full image</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <div className="aspect-square w-full overflow-hidden rounded-md">
                <img
                  src={imageUrl}
                  alt={formattedBreed}
                  className="h-full w-full object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between p-4">
        <div>
          {breedName && (
            <Link to="/breeds/$breedId" params={{ breedId: breedName.split('-')[0] }}>
              <Badge variant="outline" className="hover:bg-accent">
                {formattedBreed}
              </Badge>
            </Link>
          )}
        </div>
        
        {canManageFavorites && (
          <Button
            size="icon"
            variant="ghost"
            onClick={handleFavoriteClick}
            className="h-8 w-8"
          >
            <Heart
              className={cn(
                'h-4 w-4',
                isFavorite(imageUrl) ? 'fill-destructive text-destructive' : ''
              )}
            />
            <span className="sr-only">
              {isFavorite(imageUrl) ? 'Remove from favorites' : 'Add to favorites'}
            </span>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// Skeleton version for loading state
export function DogCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Skeleton className="aspect-square h-full w-full" />
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardFooter>
    </Card>
  )
} 