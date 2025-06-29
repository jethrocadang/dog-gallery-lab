// Import the root route
import { rootRoute } from '@/lib/root-route'

// Import the root route component
import { Route as rootRouteComponent } from './routes/__root'

// Import the other routes
import { Route as indexRoute } from './routes/index'
import { Route as breedsIndexRoute } from './routes/breeds.index'
import { Route as breedDetailRoute } from './routes/breeds.$breedId'
import { Route as favoritesRoute } from './routes/favorites.index'
import { Route as authLoginRoute } from './routes/auth.login'
import { Route as adminIndexRoute } from './routes/admin/index'
import { Route as adminUsersRoute } from './routes/admin/users'

// Create the route tree
export const routeTree = rootRouteComponent.addChildren([
  indexRoute,
  breedsIndexRoute,
  breedDetailRoute,
  favoritesRoute,
  authLoginRoute,
  adminIndexRoute,
  adminUsersRoute,
]) 