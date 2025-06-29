import { createFileRoute, createRootRouteWithContext } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'

// Define the router context type
export interface RouterContext {
  queryClient: QueryClient
}

// Create a root route with context
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => null, // This will be replaced by the __root.tsx file
})

// Helper function to create file routes with the correct context type
export function createRoute<T extends Record<string, any> = {}>(options?: Parameters<typeof createFileRoute<T & RouterContext>>[0]) {
  return createFileRoute<T & RouterContext>(options)
} 