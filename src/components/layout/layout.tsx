import { ReactNode } from 'react'
import { Header } from './header'
import { Footer } from './footer'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: ReactNode
  className?: string
  fullWidth?: boolean
}

export function Layout({ children, className, fullWidth }: LayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className={cn('flex-1', !fullWidth && 'container py-6', className)}>
        {children}
      </main>
      <Footer />
    </div>
  )
} 