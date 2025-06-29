import { createContext, useContext, useState, ReactNode } from 'react'

// Define role and permission types
export type Role = 'guest' | 'user' | 'admin'
export type Permission = 'view:gallery' | 'manage:favorites' | 'access:admin'

// Define user interface
export interface User {
  id: string
  email: string
  name: string
  role: Role
  permissions: Permission[]
}

// Mock users for authentication
export const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'guest@example.com',
    name: 'Guest User',
    role: 'guest',
    permissions: ['view:gallery'],
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user',
    permissions: ['view:gallery', 'manage:favorites'],
  },
  {
    id: '3',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    permissions: ['view:gallery', 'manage:favorites', 'access:admin'],
  },
]

// Define authentication context type
interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  hasPermission: (permission: Permission) => boolean
  hasRole: (role: Role) => boolean
}

// Create authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Authentication provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('dogGalleryUser')
    return storedUser ? JSON.parse(storedUser) : null
  })

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple mock authentication
    // In a real app, you would validate credentials against a backend
    const foundUser = MOCK_USERS.find((u) => u.email === email)
    
    if (foundUser) {
      // Store user in state and localStorage
      setUser(foundUser)
      localStorage.setItem('dogGalleryUser', JSON.stringify(foundUser))
      return true
    }
    
    return false
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem('dogGalleryUser')
  }

  // Check if user has a specific permission
  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false
    return user.permissions.includes(permission)
  }

  // Check if user has a specific role
  const hasRole = (role: Role): boolean => {
    if (!user) return false
    
    // Admin has all roles
    if (user.role === 'admin') return true
    
    // User has user and guest roles
    if (user.role === 'user' && (role === 'user' || role === 'guest')) return true
    
    // Guest only has guest role
    if (user.role === 'guest' && role === 'guest') return true
    
    return false
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    hasPermission,
    hasRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook to use authentication context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Hook to check permissions
export function usePermission(permission: Permission) {
  const { hasPermission } = useAuth()
  return hasPermission(permission)
}

// Hook to check roles
export function useRole(role: Role) {
  const { hasRole } = useAuth()
  return hasRole(role)
} 