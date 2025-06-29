import { useRef, useEffect } from 'react'
import { DogCard, DogCardSkeleton } from './dog-card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DogGridProps {
  images: string[]
  isLoading: boolean
  isFetchingNextPage?: boolean
  hasNextPage?: boolean
  fetchNextPage?: () => void
  className?: string
  emptyMessage?: string
  breedFilter?: string
}

export function DogGrid({
  images,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  className,
  emptyMessage = "No images found",
  breedFilter,
}: DogGridProps) {
  const observerTarget = useRef<HTMLDivElement>(null)
  
  // Infinite scroll with Intersection Observer
  useEffect(() => {
    if (!hasNextPage || !fetchNextPage) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.5 }
    )
    
    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }
    
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])
  
  // Show loading skeletons
  if (isLoading) {
    return (
      <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4', className)}>
        {Array(12)
          .fill(null)
          .map((_, i) => (
            <DogCardSkeleton key={i} />
          ))}
      </div>
    )
  }
  
  // Show empty state
  if (!isLoading && images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="mb-4 text-center text-lg text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-8">
      <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4', className)}>
        {images.map((imageUrl, index) => (
          <DogCard key={`${imageUrl}-${index}`} imageUrl={imageUrl} breed={breedFilter} />
        ))}
      </div>
      
      {(hasNextPage || isFetchingNextPage) && (
        <div
          ref={observerTarget}
          className="mt-8 flex items-center justify-center"
        >
          <Button
            variant="outline"
            disabled={!hasNextPage || isFetchingNextPage}
            onClick={() => fetchNextPage?.()}
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading more...
              </>
            ) : (
              'Load more'
            )}
          </Button>
        </div>
      )}
    </div>
  )
} 