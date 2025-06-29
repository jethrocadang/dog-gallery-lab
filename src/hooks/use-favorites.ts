import { useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import * as FavoritesService from '../lib/favorites'
import { FavoriteItem } from '../lib/favorites'
import { useAuth } from '../lib/auth'

/**
 * Custom hook for managing favorites
 * Provides methods to interact with favorites and keeps state in sync
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const queryClient = useQueryClient()
  const { hasPermission } = useAuth()
  const canManageFavorites = hasPermission('manage:favorites')

  // Load favorites on mount
  useEffect(() => {
    if (canManageFavorites) {
      setFavorites(FavoritesService.getFavorites())
    } else {
      setFavorites([])
    }
  }, [canManageFavorites])

  /**
   * Add an image to favorites
   * @param imageUrl URL of the image to add
   * @param breed Optional breed name
   */
  const addFavorite = (imageUrl: string, breed?: string) => {
    if (!canManageFavorites) return null
    
    const newFavorite = FavoritesService.addFavorite(imageUrl, breed)
    setFavorites(FavoritesService.getFavorites())
    return newFavorite
  }

  /**
   * Remove an image from favorites
   * @param imageUrl URL of the image to remove
   */
  const removeFavorite = (imageUrl: string) => {
    if (!canManageFavorites) return false
    
    const result = FavoritesService.removeFavorite(imageUrl)
    if (result) {
      setFavorites(FavoritesService.getFavorites())
    }
    return result
  }

  /**
   * Toggle favorite status of an image
   * @param imageUrl URL of the image
   * @param breed Optional breed name
   */
  const toggleFavorite = (imageUrl: string, breed?: string) => {
    if (!canManageFavorites) return
    
    if (isFavorite(imageUrl)) {
      removeFavorite(imageUrl)
    } else {
      addFavorite(imageUrl, breed)
    }
  }

  /**
   * Check if an image is in favorites
   * @param imageUrl URL of the image to check
   */
  const isFavorite = (imageUrl: string) => {
    if (!canManageFavorites) return false
    return FavoritesService.isFavorite(imageUrl)
  }

  /**
   * Clear all favorites
   */
  const clearFavorites = () => {
    if (!canManageFavorites) return
    
    FavoritesService.clearFavorites()
    setFavorites([])
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    canManageFavorites,
  }
} 