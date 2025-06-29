import { redirect, Link, Route as RouteImpl } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import { useAuth, MOCK_USERS } from '@/lib/auth'
import { rootRoute } from '@/lib/root-route'

export const Route = new RouteImpl({
  getParentRoute: () => rootRoute,
  path: '/admin/users',
  component: AdminUsersRoute,
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

function AdminUsersRoute() {
  const { user, hasPermission } = useAuth()
  
  // Backup redirect if beforeLoad fails
  if (!user || !hasPermission('access:admin')) {
    throw redirect({
      to: '/',
    })
  }
  
  // Get role badge variant
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive'
      case 'user':
        return 'default'
      default:
        return 'secondary'
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/admin/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to admin</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {MOCK_USERS.map((mockUser) => (
          <Card key={mockUser.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{mockUser.name}</span>
                <Badge variant={getRoleBadgeVariant(mockUser.role)}>
                  {mockUser.role}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span>{mockUser.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">ID</span>
                  <span className="text-xs text-muted-foreground">{mockUser.id}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {mockUser.permissions.map((permission) => (
                    <Badge key={permission} variant="outline">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 