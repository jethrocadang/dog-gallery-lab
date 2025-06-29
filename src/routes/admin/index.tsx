import { redirect, Route as RouteImpl } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Database, Settings } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { rootRoute } from '@/lib/root-route'

export const Route = new RouteImpl({
  getParentRoute: () => rootRoute,
  path: '/admin/',
  component: AdminRoute,
  beforeLoad: () => {
    // Check if user has admin access
    const user = localStorage.getItem('dogGalleryUser')
    if (!user) {
      throw redirect({
        to: '/auth/login',
      })
    }
    
    const userData = JSON.parse(user)
    if (!userData.permissions.includes('access:admin')) {
      throw redirect({
        to: '/',
      })
    }
    
    return {}
  },
})

function AdminRoute() {
  const { user, hasPermission } = useAuth()
  
  // Backup redirect if beforeLoad fails
  if (!user || !hasPermission('access:admin')) {
    throw redirect({
      to: '/',
    })
  }
  
  const adminModules = [
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: <Users className="h-8 w-8" />,
    },
    {
      title: 'API Statistics',
      description: 'View API usage and performance metrics',
      icon: <Database className="h-8 w-8" />,
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences',
      icon: <Settings className="h-8 w-8" />,
    },
  ]
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {adminModules.map((module) => (
          <Card key={module.title} className="transition-transform hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {module.icon}
                {module.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{module.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">API Status</span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Updated</span>
              <span>{new Date().toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Active Users</span>
              <span>3</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 