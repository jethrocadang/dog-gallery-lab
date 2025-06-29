// Favorites service for managing user's favorite dog images
// This service uses localStorage for persistence

// Key for storing favorites in localStorage
const FAVORITES_STORAGE_KEY = 'dogGalleryFavorites'

// Interface for a favorite item
export interface FavoriteItem {
  id: string // Using the image URL as ID
  imageUrl: string
  breed?: string
  addedAt: number // Timestamp
}

/**
 * Get all favorites for the current user
 * @returns Array of favorite items
 */
export function getFavorites(): FavoriteItem[] {
  const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY)
  return storedFavorites ? JSON.parse(storedFavorites) : []
}

/**
 * Add a dog image to favorites
 * @param imageUrl URL of the dog image
 * @param breed Optional breed name
 * @returns The newly added favorite item
 */
export function addFavorite(imageUrl: string, breed?: string): FavoriteItem {
  const favorites = getFavorites()
  
  // Check if already in favorites
  if (favorites.some(fav => fav.imageUrl === imageUrl)) {
    return favorites.find(fav => fav.imageUrl === imageUrl)!
  }
  
  // Create new favorite item
  const newFavorite: FavoriteItem = {
    id: imageUrl, // Using URL as ID
    imageUrl,
    breed,
    addedAt: Date.now(),
  }
  
  // Add to favorites and save
  const updatedFavorites = [...favorites, newFavorite]
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites))
  
  return newFavorite
}

/**
 * Remove a dog image from favorites
 * @param imageUrl URL of the dog image to remove
 * @returns Boolean indicating success
 */
export function removeFavorite(imageUrl: string): boolean {
  const favorites = getFavorites()
  const updatedFavorites = favorites.filter(fav => fav.imageUrl !== imageUrl)
  
  // If no change, return false
  if (updatedFavorites.length === favorites.length) {
    return false
  }
  
  // Save updated favorites
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites))
  return true
}

/**
 * Check if a dog image is in favorites
 * @param imageUrl URL of the dog image
 * @returns Boolean indicating if image is in favorites
 */
export function isFavorite(imageUrl: string): boolean {
  const favorites = getFavorites()
  return favorites.some(fav => fav.imageUrl === imageUrl)
}

/**
 * Clear all favorites
 */
export function clearFavorites(): void {
  localStorage.removeItem(FAVORITES_STORAGE_KEY)
} 