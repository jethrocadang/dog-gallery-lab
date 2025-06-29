import { useParams, Link, Route as RouteImpl } from '@tanstack/react-router'
import { useBreedImages } from '@/hooks/use-dog-query'
import { DogGrid } from '@/components/features/dog-grid'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { rootRoute } from '@/lib/root-route'

export const Route = new RouteImpl({
  getParentRoute: () => rootRoute,
  path: '/breeds/$breedId',
  component: BreedDetailRoute,
})

function BreedDetailRoute() {
  const { breedId } = useParams({ from: '/breeds/$breedId' })
  const { data: images, isLoading } = useBreedImages(breedId)
  
  // Format breed name for display
  const formatBreedName = (name: string) => {
    return name
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  }
  
  const breedName = formatBreedName(breedId)
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/breeds/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to breeds</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{breedName}</h1>
          <p className="text-muted-foreground">
            Explore images of {breedName} dogs
          </p>
        </div>
      </div>
      
      <DogGrid
        images={images || []}
        isLoading={isLoading}
        breedFilter={breedId}
        emptyMessage={`No images found for ${breedName}`}
      />
    </div>
  )
} 