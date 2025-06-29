import { redirect, Route as RouteImpl } from '@tanstack/react-router'
import { LoginForm } from '@/components/features/login-form'
import { useAuth } from '@/lib/auth'
import { rootRoute } from '@/lib/root-route'

export const Route = new RouteImpl({
  getParentRoute: () => rootRoute,
  path: '/auth/login',
  component: LoginRoute,
  beforeLoad: async () => {
    // Redirect to home if already authenticated
    const isAuthenticated = localStorage.getItem('dogGalleryUser')
    if (isAuthenticated) {
      throw redirect({
        to: '/',
      })
    }
    return {}
  },
})

function LoginRoute() {
  const { isAuthenticated } = useAuth()
  
  // This is a backup in case the beforeLoad redirect doesn't work
  if (isAuthenticated) {
    throw redirect({
      to: '/',
    })
  }
  
  return (
    <div className="mx-auto max-w-md py-10">
      <LoginForm />
    </div>
  )
} 