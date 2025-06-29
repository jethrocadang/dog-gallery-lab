import { useState } from 'react'
import { Link, Route as RouteImpl } from '@tanstack/react-router'
import { useBreeds } from '@/hooks/use-dog-query'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search } from 'lucide-react'
import { rootRoute } from '@/lib/root-route'

export const Route = new RouteImpl({
  getParentRoute: () => rootRoute,
  path: '/breeds/',
  component: BreedsRoute,
})

function BreedsRoute() {
  const { data: breeds, isLoading } = useBreeds()
  const [searchQuery, setSearchQuery] = useState('')
  
  // Filter breeds based on search query
  const filteredBreeds = breeds?.filter(breed => 
    breed.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []
  
  // Format breed name for display
  const formatBreedName = (name: string) => {
    return name
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dog Breeds</h1>
        <p className="text-muted-foreground">
          Browse all dog breeds and explore their images
        </p>
      </div>
      
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="search"
          placeholder="Search breeds..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array(12)
            .fill(null)
            .map((_, i) => (
              <Card key={i} className="h-[120px]">
                <CardHeader>
                  <div className="h-6 w-24 animate-pulse rounded-md bg-muted" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 w-16 animate-pulse rounded-md bg-muted" />
                </CardContent>
              </Card>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredBreeds.map((breed) => (
            <Link
              key={breed.name}
              to="/breeds/$breedId"
              params={{ breedId: breed.name }}
              className="transition-transform hover:scale-[1.02]"
            >
              <Card>
                <CardHeader>
                  <CardTitle>{formatBreedName(breed.name)}</CardTitle>
                </CardHeader>
                <CardContent>
                  {breed.subBreeds.length > 0 && (
                    <CardDescription>
                      {breed.subBreeds.length} sub-breed{breed.subBreeds.length !== 1 ? 's' : ''}
                    </CardDescription>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
      
      {!isLoading && filteredBreeds.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-center text-lg text-muted-foreground">
            No breeds found matching "{searchQuery}"
          </p>
          <Button
            variant="link"
            onClick={() => setSearchQuery('')}
            className="mt-2"
          >
            Clear search
          </Button>
        </div>
      )}
    </div>
  )
} 