import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth'

interface MainNavProps {
  className?: string
  isMobile?: boolean
  onNavigate?: () => void
}

export function MainNav({ className, isMobile, onNavigate }: MainNavProps) {
  const { hasPermission } = useAuth()
  
  const navItems = [
    {
      title: 'Gallery',
      href: '/',
      permission: 'view:gallery' as const,
    },
    {
      title: 'Breeds',
      href: '/breeds',
      permission: 'view:gallery' as const,
    },
    {
      title: 'Favorites',
      href: '/favorites',
      permission: 'manage:favorites' as const,
    },
    {
      title: 'Admin',
      href: '/admin',
      permission: 'access:admin' as const,
    },
  ]
  
  const handleClick = () => {
    if (onNavigate) {
      onNavigate()
    }
  }
  
  return (
    <nav className={cn('flex items-center gap-6', isMobile ? 'flex-col items-start gap-4 px-2 py-6' : '', className)}>
      {navItems.map((item) => 
        hasPermission(item.permission) ? (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              isMobile ? 'w-full px-2 py-2 hover:bg-accent hover:text-accent-foreground' : ''
            )}
            activeProps={{ className: 'text-primary font-bold' }}
            onClick={handleClick}
          >
            {item.title}
          </Link>
        ) : null
      )}
    </nav>
  )
} 