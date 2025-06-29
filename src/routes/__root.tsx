import { Outlet } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from '@/components/layout/layout'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/lib/auth'
import { rootRoute } from '@/lib/root-route'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
    },
  },
})

// Update the root route with the component
export const Route = rootRoute.update({
  component: RootComponent,
})

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <AuthProvider>
          <Layout>
            <Outlet />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
} 