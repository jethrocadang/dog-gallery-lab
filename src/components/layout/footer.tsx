import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
        <div className="text-center text-sm text-muted-foreground md:text-left">
          <p>&copy; {new Date().getFullYear()} Dog Gallery. All rights reserved.</p>
          <p className="mt-1">
            Powered by{' '}
            <a
              href="https://dog.ceo/dog-api/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Dog CEO API
            </a>
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="/" className="font-medium underline-offset-4 hover:underline">
            Home
          </Link>
          <Link to="/breeds" className="font-medium underline-offset-4 hover:underline">
            Breeds
          </Link>
          <Link to="/favorites" className="font-medium underline-offset-4 hover:underline">
            Favorites
          </Link>
        </div>
      </div>
    </footer>
  )
} 