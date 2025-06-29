import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import * as DogApi from '../lib/api/dog-api'

// Query keys for React Query
export const dogQueryKeys = {
  all: ['dogs'] as const,
  breeds: () => [...dogQueryKeys.all, 'breeds'] as const,
  breed: (breed: string) => [...dogQueryKeys.breeds(), breed] as const,
  breedImages: (breed: string) => [...dogQueryKeys.breed(breed), 'images'] as const,
  randomImages: (count?: number) => [...dogQueryKeys.all, 'random', count] as const,
  randomBreedImages: (breed: string, count?: number) => 
    [...dogQueryKeys.breed(breed), 'random', count] as const,
}

/**
 * Hook to fetch all dog breeds
 */
export function useBreeds() {
  return useQuery({
    queryKey: dogQueryKeys.breeds(),
    queryFn: DogApi.getAllBreeds,
  })
}

/**
 * Hook to fetch images for a specific breed
 * @param breed The breed name
 */
export function useBreedImages(breed: string) {
  return useQuery({
    queryKey: dogQueryKeys.breedImages(breed),
    queryFn: () => DogApi.getBreedImages(breed),
    enabled: !!breed,
  })
}

/**
 * Hook to fetch random dog images with infinite scrolling
 * @param initialCount Number of images to fetch initially
 */
export function useInfiniteRandomImages(initialCount: number = 10) {
  return useInfiniteQuery({
    queryKey: dogQueryKeys.randomImages(),
    queryFn: ({ pageParam = 1 }) => DogApi.getRandomImages(initialCount),
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
  })
}

/**
 * Hook to fetch random images for a specific breed with infinite scrolling
 * @param breed The breed name
 * @param initialCount Number of images to fetch initially
 */
export function useInfiniteBreedImages(breed: string, initialCount: number = 10) {
  return useInfiniteQuery({
    queryKey: dogQueryKeys.randomBreedImages(breed),
    queryFn: ({ pageParam = 1 }) => DogApi.getRandomBreedImages(breed, initialCount),
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
    enabled: !!breed,
  })
}

/**
 * Hook to fetch a single random image
 */
export function useRandomImage() {
  return useQuery({
    queryKey: [...dogQueryKeys.randomImages(), 'single'],
    queryFn: DogApi.getRandomImage,
  })
} 