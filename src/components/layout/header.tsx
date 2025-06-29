import { Link } from '@tanstack/react-router'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth'
import { LogIn, LogOut, Menu, User } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useState } from 'react'
import { MainNav } from './main-nav'

export function Header() {
  const { user, logout, isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">Dog Gallery</span>
          </Link>
          <MainNav className="hidden md:flex" />
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/favorites" className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline-block">
                      {user?.name}
                    </span>
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline-block">Logout</span>
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth/login" className="flex items-center gap-1">
                  <LogIn className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline-block">Login</span>
                </Link>
              </Button>
            )}
            
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="pr-0">
                <MainNav className="flex flex-col" isMobile onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  )
} 