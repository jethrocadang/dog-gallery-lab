import { useInfiniteRandomImages } from '@/hooks/use-dog-query'
import { DogGrid } from '@/components/features/dog-grid'
import { Route as RouteImpl } from '@tanstack/react-router'
import { rootRoute } from '@/lib/root-route'

export const Route = new RouteImpl({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexRoute,
})

function IndexRoute() {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteRandomImages(12)
  
  // Flatten the pages of images
  const images = data?.pages.flat() || []
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dog Gallery</h1>
        <p className="text-muted-foreground">
          Explore beautiful dog images from various breeds
        </p>
      </div>
      
      <DogGrid
        images={images}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  )
} 