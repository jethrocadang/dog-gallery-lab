// Dog API service for interacting with the Dog CEO API
// https://dog.ceo/dog-api/

// Base API URL
const API_BASE_URL = 'https://dog.ceo/api'

// Interface for API responses
interface ApiResponse<T> {
  message: T
  status: string
}

// Interface for breed list response
export interface BreedListResponse {
  [breed: string]: string[]
}

// Interface for breed info
export interface BreedInfo {
  name: string
  subBreeds: string[]
}

/**
 * Fetches a list of all dog breeds
 * @returns Promise with breed list
 */
export async function getAllBreeds(): Promise<BreedInfo[]> {
  const response = await fetch(`${API_BASE_URL}/breeds/list/all`)
  const data: ApiResponse<BreedListResponse> = await response.json()
  
  // Transform the response into a more usable format
  return Object.entries(data.message).map(([breed, subBreeds]) => ({
    name: breed,
    subBreeds,
  }))
}

/**
 * Fetches random dog images
 * @param count Number of random images to fetch (default: 10)
 * @returns Promise with array of image URLs
 */
export async function getRandomImages(count: number = 10): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/breeds/image/random/${count}`)
  const data: ApiResponse<string[]> = await response.json()
  return data.message
}

/**
 * Fetches images for a specific breed
 * @param breed The breed name
 * @returns Promise with array of image URLs
 */
export async function getBreedImages(breed: string): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/breed/${breed}/images`)
  const data: ApiResponse<string[]> = await response.json()
  return data.message
}

/**
 * Fetches random images for a specific breed
 * @param breed The breed name
 * @param count Number of random images to fetch (default: 10)
 * @returns Promise with array of image URLs
 */
export async function getRandomBreedImages(breed: string, count: number = 10): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/breed/${breed}/images/random/${count}`)
  const data: ApiResponse<string[]> = await response.json()
  return data.message
}

/**
 * Fetches images for a specific sub-breed
 * @param breed The main breed name
 * @param subBreed The sub-breed name
 * @returns Promise with array of image URLs
 */
export async function getSubBreedImages(breed: string, subBreed: string): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/breed/${breed}/${subBreed}/images`)
  const data: ApiResponse<string[]> = await response.json()
  return data.message
}

/**
 * Fetches a single random image
 * @returns Promise with image URL
 */
export async function getRandomImage(): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/breeds/image/random`)
  const data: ApiResponse<string> = await response.json()
  return data.message
} 